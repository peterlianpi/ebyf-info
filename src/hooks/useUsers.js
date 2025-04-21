"use client";

import { useState, useEffect } from "react";
import { encryptData, decryptData } from "@/utils/crypto";
import { saveToDB, getFromDB } from "@/utils/indexedDB";
import toast from "react-hot-toast";

const domain = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const USERS_KEY = "users_all";
const SYNC_KEY = "users_lastSync";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userAdded, setUserAdded] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [newMembersCount, setNewMembersCount] = useState(0);

  // 🔁 Merge old users with new ones based on ID
  const mergeUsers = (oldUsers = [], updates = []) => {
    const idMap = new Map(oldUsers.map((u) => [u.id, u]));
    let newCount = 0;

    updates.forEach((user) => {
      if (!idMap.has(user.id)) newCount++;
      idMap.set(user.id, user);
    });

    setNewMembersCount(newCount);
    return Array.from(idMap.values());
  };

  // 🌐 Fetch updated users from the server using lastSync
  const fetchUsers = async () => {
    setUsersLoading(true);
    const lastSyncFromDB = (await getFromDB(SYNC_KEY)) || null;
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
      const updates = data?.members || [];
      const newLastSync = data?.lastSync || new Date().toISOString();

      const existingEncrypted = await getFromDB(USERS_KEY);
      const existingDecrypted = existingEncrypted
        ? decryptData(existingEncrypted)
        : [];

      const mergedUsers = mergeUsers(existingDecrypted, updates);

      const encrypted = encryptData(mergedUsers);
      if (encrypted) {
        await saveToDB(USERS_KEY, encrypted);
        await saveToDB(SYNC_KEY, newLastSync);
      }

      setUsers(mergedUsers);
      setUserAdded(true);
      setLastSync(newLastSync);

      toast.dismiss(); // Remove loading toast
      toast.success(
        `Synced successfully! ${newMembersCount} new members added`
      );
    } catch (err) {
      console.error("Sync failed:", err);
      const fallbackEncrypted = await getFromDB(USERS_KEY);
      const fallbackDecrypted = fallbackEncrypted
        ? decryptData(fallbackEncrypted)
        : [];
      setUsers(fallbackDecrypted);
      toast.dismiss();
      toast.error("Failed to sync users. Loaded local fallback.");
    } finally {
      setUsersLoading(false);
    }
  };

  // 🧠 Load local users first, then sync if online
  useEffect(() => {
    (async () => {
      try {
        const localEncrypted = await getFromDB(USERS_KEY);
        const localDecrypted = localEncrypted
          ? decryptData(localEncrypted)
          : [];

        const syncTime = (await getFromDB(SYNC_KEY)) || null;
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
