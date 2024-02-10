"use client";

import { useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userAdded, setUserAdded] = useState(false);

  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      setUsers(users);
      setUsersLoading(false);
    } catch (error) {
      console.error("Error fetching users : ", error);
      setUsers([]);
      setUsersLoading(false);
    }
  };

  return { usersLoading, users, fetchUsers, userAdded, setUserAdded };
}
