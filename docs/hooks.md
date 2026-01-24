# Hooks Documentation

This document describes the custom hooks in the `hooks/` directory.

## useUsers Hook (`hooks/useUsers.ts`)

**Description:** Custom hook for managing user data, including fetching from API, local storage, encryption, and sync functionality.

**State Management:**
- `users: User[]`: Array of user objects.
- `usersLoading: boolean`: Boolean for loading state.
- `userAdded: boolean`: Boolean for user addition state.
- `lastSync: string | null`: Timestamp of last sync.
- `newMembersCount: number`: Count of new members.

**Functions:**
- `mergeUsers(oldUsers: User[], updates: User[]): User[]`: Merges user arrays by ID.
- `fetchUsers(): Promise<void>`: Fetches users from API, merges with local data, encrypts and saves to IndexedDB.

**Functionality:**
- Loads local users first.
- Syncs with API if online, using since parameter for incremental updates.
- Encrypts/decrypts data for storage.
- Handles offline mode.
- Toast notifications for sync status.

**Dependencies:** `encryptData`, `decryptData`, `saveToDB`, `getFromDB`, `react-hot-toast`, environment variables for domain and API key.

**Client-Side:** Uses `"use client"`.

**Return Object:**
```typescript
{
  users: User[],
  usersLoading: boolean,
  fetchUsers: () => Promise<void>,
  userAdded: boolean,
  setUserAdded: (added: boolean) => void,
  setUsersLoading: (loading: boolean) => void,
  lastSync: string | null,
  newMembersCount: number,
}
```

**Usage Example:**
```typescript
const { users, usersLoading, fetchUsers } = useUsers();