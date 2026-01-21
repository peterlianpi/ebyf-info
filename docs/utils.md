# Utils Documentation

This document describes the utility functions in the `src/utils/` directory.

## crypto.js

**Description:** Encryption and decryption utilities using AES.

**Functions:**
- `encryptData(data)`: Encrypts data to string.
- `decryptData(encryptedData)`: Decrypts string to data, with fallback key support.

**Dependencies:** `crypto-js`.

**Usage Example:**
```js
const encrypted = encryptData({ name: "John" });
const decrypted = decryptData(encrypted);
```

## filterLocalMembersByRole.js

**Description:** Filters locally stored users by various criteria.

**Function:**
- `filterLocalMembersByRole({ includedRoles, excludedRoles, keywords, searchQuery })`: Filters users from IndexedDB.

**Parameters:**
- `includedRoles`: Array of role names to include.
- `excludedRoles`: Array of role names to exclude.
- `keywords`: Keyword to match in roles.
- `searchQuery`: General search in name, phone, email, roles.

**Returns:** Promise of filtered user array.

**Usage Example:**
```js
const members = await filterLocalMembersByRole({
  includedRoles: ["President"],
  searchQuery: "John"
});
```

## getLocalMembersByRole.js

**Description:** Simulates API routes using local storage for member filtering.

**Function:**
- `getLocalMembersByRoute(route, query)`: Returns members based on route and query.

**Routes:** library, mopuan, makaite, vengukte, blood, talen, search.

**Usage Example:**
```js
const result = await getLocalMembersByRoute("library");
```

## indexedDB.js

**Description:** IndexedDB utilities for storing encrypted data.

**Functions:**
- `openDB()`: Opens/creates database.
- `saveToDB(key, value)`: Saves encrypted value.
- `getFromDB(key)`: Retrieves value.

**Usage Example:**
```js
await saveToDB("users", encryptedData);
const data = await getFromDB("users");
```

## roleFilters.js

**Description:** Mapping function for tab-based filtering.

**Function:**
- `getFilterByTab(tabLabel)`: Returns filter options for tab.

**Tabs:** Sisan (blood), Library, Mopuan.

**Usage Example:**
```js
const filters = getFilterByTab("Library");
// { keywords: "library" }