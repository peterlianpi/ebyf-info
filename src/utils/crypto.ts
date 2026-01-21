// utils/crypto.ts
import CryptoJS from "crypto-js";

// Use environment variables for your encryption keys
const PRIMARY_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default-dev-key";
const FALLBACK_KEY = process.env.NEXT_PUBLIC_OLD_ENCRYPTION_KEY || null;

/**
 * Encrypts any JavaScript data (object/array/string) into AES-encrypted text.
 * @param data - Data to encrypt.
 * @returns AES-encrypted string or null if failed.
 */
export function encryptData(data: unknown): string | null {
  try {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, PRIMARY_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
}

/**
 * Decrypts AES-encrypted string back to original data.
 * Falls back to old key if primary key fails.
 * @param encryptedData - AES string to decrypt.
 * @returns Original decrypted data or null.
 */
export function decryptData(encryptedData: string): unknown | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, PRIMARY_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (primaryErr) {
    if (FALLBACK_KEY) {
      try {
        const fallbackBytes = CryptoJS.AES.decrypt(encryptedData, FALLBACK_KEY);
        const fallbackDecrypted = fallbackBytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(fallbackDecrypted);
      } catch (fallbackErr) {
        console.error("Fallback decryption also failed:", fallbackErr);
      }
    }

    console.error("Decryption failed:", primaryErr);
    return null;
  }
}
