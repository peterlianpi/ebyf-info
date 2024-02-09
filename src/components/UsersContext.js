"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users : ", error);
      }
    };
    // Fetch users initially
    fetchUsers();

    // Set up polling to fetch users every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchUsers, 5000);
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
