"use client";
import { useState, useEffect } from "react";

export function useUsers(route = "") {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userAdded, setUserAdded] = useState(false);
  const domain = process.env.NEXT_PUBLIC_API_URL;

  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
      // Fetch data from the API based on the provided route
      const response = await fetch(`${domain}/api/ebyf${route}`, {
        method: "GET",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      const usersData = data?.members || []; // Assuming 'members' is the data field

      setUsers(usersData);

      // Save to localStorage for offline use
      localStorage.setItem(`users_${route}`, JSON.stringify(usersData));

      setUserAdded(true);
      setUsersLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);

      // Fallback: use cached data from localStorage based on route
      const cachedUsers = localStorage.getItem(`users_${route}`);
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
      const cachedUsers = localStorage.getItem(`users_${route}`);
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
        setUsersLoading(false);
      }
    } else {
      fetchUsers(); // Fetch from API if online
    }
  }, [route]); // Trigger effect when route changes

  return {
    usersLoading,
    users,
    fetchUsers,
    userAdded,
    setUserAdded,
    setUsersLoading,
  };
}
