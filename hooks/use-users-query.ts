"use client";

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { encryptData, decryptData } from '@/utils/crypto';
import { saveToDB, getFromDB, batchSaveToDB } from '@/utils/indexedDB';
import { mergeUserData, shouldUseCacheOnly } from '@/lib/query-client';
import { User } from '@/types';
import toast from 'react-hot-toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWindow = (globalThis as any).window || {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalNavigator = (globalThis as any).navigator || {};

const domain = process.env.NEXT_PUBLIC_API_URL || "";
const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

const USERS_KEY = "users_all";
const SYNC_KEY = "users_lastSync";

// API function to fetch users from the server
async function fetchUsersFromAPI(lastSync?: string | null): Promise<{
  members: User[];
  lastSync: string;
  totalMembers: number;
}> {
  const url = lastSync
    ? `${domain}/api/ebyf?orgId=1&since=${lastSync}`
    : `${domain}/api/ebyf?orgId=1`;

  const response = await fetch(url, {
    method: "GET",
    headers: { "x-api-key": apiKey },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  return response.json();
}

// Function to get cached users from IndexedDB
async function getCachedUsers(): Promise<User[]> {
  try {
    const encrypted = await getFromDB(USERS_KEY);
    if (!encrypted) return [];

    const decrypted = decryptData(encrypted);
    return Array.isArray(decrypted) ? decrypted : [];
  } catch (error) {
    console.error("Error loading cached users:", error);
    return [];
  }
}

// Function to save users to IndexedDB
async function saveUsersToCache(users: User[], lastSync: string): Promise<void> {
  try {
    const encrypted = encryptData(users);
    if (encrypted) {
      await batchSaveToDB([
        [USERS_KEY, encrypted],
        [SYNC_KEY, lastSync],
      ]);
    }
  } catch (error) {
    console.error("Error saving users to cache:", error);
  }
}

export function useUsersQuery() {
  const queryClient = useQueryClient();
  const [isOnline, setIsOnline] = useState(globalNavigator.onLine);
  const [lastSync, setLastSync] = useState<string | null>(null);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    globalWindow.addEventListener('online', handleOnline);
    globalWindow.addEventListener('offline', handleOffline);

    return () => {
      globalWindow.removeEventListener('online', handleOnline);
      globalWindow.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load last sync time on mount
  useEffect(() => {
    getFromDB(SYNC_KEY).then(syncTime => {
      setLastSync(syncTime as string | null);
    });
  }, []);

  // Main query for users with offline-first caching
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      // Always try to get cached data first
      const cachedUsers = await getCachedUsers();

      // If offline, return cached data immediately
      if (!isOnline || shouldUseCacheOnly()) {
        if (cachedUsers.length > 0) {
          toast.success("Offline: Using cached data");
          return cachedUsers;
        }
        throw new Error("No cached data available offline");
      }

      try {
        // Fetch fresh data from API
        toast.loading("Syncing users...");
        const freshData = await fetchUsersFromAPI(lastSync);

        // Merge cached and fresh data
        const mergedUsers = mergeUserData(cachedUsers, freshData.members);

        // Save to cache
        await saveUsersToCache(mergedUsers, freshData.lastSync);
        setLastSync(freshData.lastSync);

        // Update local state
        queryClient.setQueryData(['users'], mergedUsers);

        toast.dismiss();
        toast.success(`Synced ${freshData.totalMembers} members`);

        return mergedUsers;
      } catch (error) {
        toast.dismiss();
        // If API fails but we have cached data, return cached data
        if (cachedUsers.length > 0) {
          toast.error("Using cached data due to sync failure");
          return cachedUsers;
        }
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: false, // We'll handle initial load manually
    enabled: true, // Always enabled, we'll handle offline logic inside
  });

  // Mutation for manual sync
  const syncMutation = useMutation({
    mutationFn: () => fetchUsersFromAPI(lastSync),
    onSuccess: async (data) => {
      const cachedUsers = await getCachedUsers();
      const mergedUsers = mergeUserData(cachedUsers, data.members);

      await saveUsersToCache(mergedUsers, data.lastSync);
      setLastSync(data.lastSync);

      // Update the query cache
      queryClient.setQueryData(['users'], mergedUsers);

      toast.success(`Synced ${data.totalMembers} members`);
    },
    onError: (error) => {
      toast.error("Failed to sync users");
      console.error("Sync error:", error);
    },
  });

  // Initialize with cached data on first load
  useEffect(() => {
    if (!usersQuery.data && !usersQuery.isLoading) {
      getCachedUsers().then(cachedUsers => {
        if (cachedUsers.length > 0) {
          queryClient.setQueryData(['users'], cachedUsers);
        }
      });
    }
  }, [usersQuery.data, usersQuery.isLoading, queryClient]);

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
    isOnline,
    lastSync,
    refetch: usersQuery.refetch,
    syncUsers: syncMutation.mutate,
    isSyncing: syncMutation.isPending,
  };
}