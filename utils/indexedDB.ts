// utils/indexedDB.ts
const DB_NAME = "SecureUserDB";
const STORE_NAME = "users";

/**
 * Opens or creates IndexedDB with 'users' object store.
 * @returns Promise<IDBDatabase>
 */
export function openDB(): Promise<IDBDatabase> {
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
 * @param key - Key to store under
 * @param value - Encrypted data to store
 */
export async function saveToDB(key: string, value: string): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put(value, key);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Retrieve a value by key from IndexedDB.
 * @param key - Key to retrieve
 * @returns Promise of stored value or undefined
 */
export async function getFromDB(key: string): Promise<string | undefined> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
