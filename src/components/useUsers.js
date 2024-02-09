"use client";

import { useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    setUsersLoading(true);
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
        setUsersLoading(false);
      });
    });
  }, []);

  return { usersLoading, users };
}
