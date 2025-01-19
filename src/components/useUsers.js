"use client";

import { useState, useEffect } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userAdded, setUserAdded] = useState(false);
  const domain = process.env.NEXT_PUBLIC_API_URL;

  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
      // Fetch data from the API
      const response = await fetch(`${domain}/api/ebyf`, {
        method: "GET",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      // Combine users and update state
      const { ebyfVengUkte, ebyfMakaite } = data;
      const users = [...ebyfVengUkte, ...ebyfMakaite];
      setUsers(users);

      // Save to localStorage for offline use
      localStorage.setItem("users", JSON.stringify(users));

      setUserAdded(true);
      setUsersLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);

      // Fallback: use cached data from localStorage
      const cachedUsers = localStorage.getItem("users");
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
      } else {
        setUsers([]);
      }

      setUsersLoading(false);
    }
  };

  useEffect(() => {
    // Check for offline mode and use cached data if available
    if (!navigator.onLine) {
      const cachedUsers = localStorage.getItem("users");
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
        setUsersLoading(false);
      }
    } else {
      fetchUsers(); // Fetch from API if online
    }
  }, []);

  return {
    usersLoading,
    users,
    fetchUsers,
    userAdded,
    setUserAdded,
    setUsersLoading,
  };
}
