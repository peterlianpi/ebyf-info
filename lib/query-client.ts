import { QueryClient } from '@tanstack/react-query';
import { User } from '@/types';

// Create a client with offline-first configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Offline-first: data stays fresh for 10 minutes
      staleTime: 10 * 60 * 1000, // 10 minutes
      // Cache for 30 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)

      // Retry logic for offline scenarios
      retry: (failureCount, error: unknown) => {
        // Type guard for error with status
        const httpError = error as { status?: number } | undefined;

        // Don't retry on 4xx errors (client errors)
        if (httpError?.status && httpError.status >= 400 && httpError.status < 500) return false;

        // Don't retry if offline
        if (!navigator.onLine) return false;

        // Retry up to 3 times for network/server errors
        return failureCount < 3;
      },

      // Refetch on these events
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false, // We'll handle initial load manually for offline-first

      // Network mode for offline handling
      networkMode: 'offlineFirst',
    },

    mutations: {
      // Optimistic updates and retry logic
      retry: (failureCount, error: unknown) => {
        if (!navigator.onLine) return false;
        return failureCount < 2;
      },
      networkMode: 'offlineFirst',
    },
  },
});

// Helper function to check if we should use cache-only mode
export function shouldUseCacheOnly(): boolean {
  return !navigator.onLine;
}

// Helper function to merge cached data with fresh data
export function mergeUserData(cachedData: User[], freshData: User[]): User[] {
  if (!cachedData || !freshData) return freshData || cachedData || [];

  const idMap = new Map(cachedData.map(user => [user.id, user]));
  freshData.forEach(user => idMap.set(user.id, user));

  return Array.from(idMap.values());
}