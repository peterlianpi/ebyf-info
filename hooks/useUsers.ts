"use client";

import { useState, useEffect } from "react";
import { encryptData, decryptData } from "@/utils/crypto";
import { saveToDB, getFromDB } from "@/utils/indexedDB";
import { User } from "@/types";
import toast from "react-hot-toast";

const domain = process.env.NEXT_PUBLIC_API_URL || "";
const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

const USERS_KEY = "users_all";
const SYNC_KEY = "users_lastSync";

export function useUsers(p0: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);
  const [userAdded, setUserAdded] = useState<boolean>(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [newMembersCount, setNewMembersCount] = useState<number>(0);

  // 🔁 Merge users based on unique ID (no longer sets count)
  const mergeUsers = (oldUsers: User[] = [], updates: User[] = []): User[] => {
    const idMap = new Map(oldUsers.map((u) => [u.id, u]));
    updates.forEach((user) => {
      idMap.set(user.id, user);
    });
    return Array.from(idMap.values());
  };

  // 🌐 Fetch users updated since the last sync
  const fetchUsers = async () => {
    setUsersLoading(true);
    const lastSyncFromDB = (await getFromDB(SYNC_KEY) as string | null) || null;
    setLastSync(lastSyncFromDB);

    try {
      toast.loading("Syncing users...");

      const res = await fetch(
        `${domain}/api/ebyf?orgId=1${
          lastSyncFromDB ? `&since=${lastSyncFromDB}` : ""
        }`,
        {
          method: "GET",
          headers: { "x-api-key": apiKey },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      const updates = Array.isArray(data?.members) ? data.members : [];
      const newLastSync = data?.lastSync || new Date().toISOString();
      const totalMembers = data?.totalMembers || 0;

      const existingEncrypted = await getFromDB(USERS_KEY) as string | null;
      const existingDecrypted = existingEncrypted
        ? (decryptData(existingEncrypted) as User[])
        : [];

      const mergedUsers = mergeUsers(existingDecrypted, updates);

      const encrypted = encryptData(mergedUsers);
      if (encrypted) {
        await saveToDB(USERS_KEY, encrypted);
        await saveToDB(SYNC_KEY, newLastSync);
      }

      setUsers(mergedUsers);
      setUserAdded(true);
      setNewMembersCount(totalMembers);
      setLastSync(newLastSync);

      toast.dismiss();
      toast.success(`Synced successfully! ${totalMembers} members added or updated.`);
    } catch (err) {
      console.error("Sync failed:", err);
      const fallbackEncrypted = await getFromDB(USERS_KEY) as string | null;
      const fallbackDecrypted = fallbackEncrypted
        ? (decryptData(fallbackEncrypted) as User[])
        : [];
      setUsers(fallbackDecrypted);
      toast.dismiss();
      toast.error("Failed to sync users. Loaded local fallback.");
    } finally {
      setUsersLoading(false);
    }
  };

  // 🧠 Load local users first, then sync online
  useEffect(() => {
    (async () => {
      try {
        const localEncrypted = await getFromDB(USERS_KEY) as string | null;
        const localDecrypted = localEncrypted
          ? (decryptData(localEncrypted) as User[])
          : [];

        const syncTime = (await getFromDB(SYNC_KEY) as string | null) || null;
        setLastSync(syncTime);
        setUsers(localDecrypted);

        if (navigator.onLine) {
          await fetchUsers();
        } else {
          toast.success("Offline: Loaded local users");
          setUsersLoading(false);
        }
      } catch (err) {
        toast.error("Failed to load local users.");
        console.error("useEffect error:", err);
        setUsersLoading(false);
      }
    })();
  }, []);

  return {
    users,
    usersLoading,
    fetchUsers,
    userAdded,
    setUserAdded,
    setUsersLoading,
    lastSync,
    newMembersCount,
  };
}
