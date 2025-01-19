"use client";

import { useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userAdded, setUserAdded] = useState(false);
  const domain = process.env.NEXT_PUBLIC_API_URL;

  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
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

      const { ebyfVengUkte, ebyfMakaite } = data;
      const users = [...ebyfVengUkte, ...ebyfMakaite];
      setUsers(users);
      setUserAdded(true);
      setUsersLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setUsersLoading(false);
    }
  };

  return {
    usersLoading,
    users,
    fetchUsers,
    userAdded,
    setUserAdded,
    setUsersLoading,
  };
}
