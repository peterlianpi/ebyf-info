"use client";

import { useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    setUsersLoading(true);
    fetch("/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((users) => {
        setUsers(users);
        setUsersLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users : ", error);
        setUsers([]);
        setUsersLoading(false);
      });
  }, []);

  return { usersLoading, users };
}
