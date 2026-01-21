# Hooks Documentation

This document describes the custom hooks in the `src/hooks/` directory.

## useUsers Hook (`src/hooks/useUsers.js`)

**Description:** Custom hook for managing user data, including fetching from API, local storage, encryption, and sync functionality.

**State Management:**
- `users`: Array of user objects.
- `usersLoading`: Boolean for loading state.
- `userAdded`: Boolean for user addition state.
- `lastSync`: Timestamp of last sync.
- `newMembersCount`: Count of new members.

**Functions:**
- `mergeUsers(oldUsers, updates)`: Merges user arrays by ID.
- `fetchUsers()`: Fetches users from API, merges with local data, encrypts and saves to IndexedDB.

**Functionality:**
- Loads local users first.
- Syncs with API if online, using since parameter for incremental updates.
- Encrypts/decrypts data for storage.
- Handles offline mode.
- Toast notifications for sync status.

**Dependencies:** `encryptData`, `decryptData`, `saveToDB`, `getFromDB`, `react-hot-toast`, environment variables for domain and API key.

**Client-Side:** Uses `"use client"`.

**Return Object:**
```js
{
  users,
  usersLoading,
  fetchUsers,
  userAdded,
  setUserAdded,
  setUsersLoading,
  lastSync,
  newMembersCount,
}
```

**Usage Example:**
```js
const { users, usersLoading, fetchUsers } = useUsers();