// utils/indexedDB.ts
const DB_NAME = "SecureUserDB";
const STORE_NAME = "users";
const DB_VERSION = 1;

// Cache database connection
let dbInstance: IDBDatabase | null = null;

/**
 * Opens or creates IndexedDB with 'users' object store.
 * Uses cached connection for efficiency.
 * @returns Promise<IDBDatabase>
 */
export function openDB(): Promise<IDBDatabase> {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error("IndexedDB error:", request.error);
      reject(request.error);
    };
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(request.result);
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onblocked = () => {
      console.warn("IndexedDB open blocked");
    };
  });
}

/**
 * Close the database connection
 */
export function closeDB(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

/**
 * Save a value (encrypted string) into IndexedDB under a key.
 * @param key - Key to store under
 * @param value - Encrypted data to store
 */
export async function saveToDB(key: string, value: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(value, key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Error saving to IndexedDB:", error);
    throw error;
  }
}

/**
 * Retrieve a value by key from IndexedDB.
 * @param key - Key to retrieve
 * @returns Promise of stored value or undefined
 */
export async function getFromDB(key: string): Promise<string | undefined> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Error retrieving from IndexedDB:", error);
    throw error;
  }
}

/**
 * Batch save multiple key-value pairs.
 * @param entries - Array of [key, value] pairs
 */
export async function batchSaveToDB(entries: Array<[string, string]>): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const promises = entries.map(([key, value]) => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put(value, key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });

    await Promise.all(promises);

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Error batch saving to IndexedDB:", error);
    throw error;
  }
}

/**
 * Delete a key from IndexedDB.
 * @param key - Key to delete
 */
export async function deleteFromDB(key: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Error deleting from IndexedDB:", error);
    throw error;
  }
}
