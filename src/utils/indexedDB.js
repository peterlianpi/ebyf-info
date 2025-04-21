// utils/indexedDB.js
const DB_NAME = "SecureUserDB";
const STORE_NAME = "users";

/**
 * Opens or creates IndexedDB with 'users' object store.
 * @returns {Promise<IDBDatabase>}
 */
export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
  });
}

/**
 * Save a value (encrypted string) into IndexedDB under a key.
 * @param {string} key
 * @param {string} value - Encrypted data
 */
export async function saveToDB(key, value) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put(value, key);
  return tx.complete;
}

/**
 * Retrieve a value by key from IndexedDB.
 * @param {string} key
 * @returns {Promise<string|null>}
 */
export async function getFromDB(key) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
