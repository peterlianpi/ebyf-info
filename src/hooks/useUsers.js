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
      const usersData = data?.members || [];

      // Update state and localStorage for offline use
      setUsers(usersData);
      localStorage.setItem(`users_${route}`, JSON.stringify(usersData));

      setUserAdded(true);
    } catch (error) {
      console.error("Error fetching users:", error);

      // Fallback: use cached data from localStorage if offline or network error
      const cachedUsers = localStorage.getItem(`users_${route}`);
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
      } else {
        setUsers([]); // Set an empty array if no cached data is available
      }
    } finally {
      // Set loading to false after the fetch completes (either success or error)
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    // Check for offline mode and use cached data if available
    if (navigator.onLine) {
      fetchUsers(); // Fetch from API if online
    } else {
      const cachedUsers = localStorage.getItem(`users_${route}`);
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
        setUsersLoading(false);
      } else {
        setUsers([]); // Optionally set empty users if no cached data
      }
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
