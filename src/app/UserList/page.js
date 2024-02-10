"use client";
import React, { useEffect, useState } from "react";

import UserItem from "@/components/UserItem";
import { useUsers } from "@/components/useUsers";
import Refresh from "@/components/icons/Refresh";

export default function UserListPage() {
  const { users, usersLoading, fetchUsers } = useUsers();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers()
      .then(() => setRefreshing(false))
      .catch((err) => {
        console.error("Error refreshing users:", err);
        setRefreshing(false);
      });
  };

  // Ensure that this function is only executed in the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchUsers();
    }
  }, []);

  if (usersLoading) {
    return "Loading user info...";
  }
  console.log(users);

  return (
    <div className="flex flex-col max-w-md gap-2 mx-auto">
      <button
        className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide border-none  rounded-lg h-[60px]"
        onClick={handleRefresh}
      >
        <Refresh />
      </button>
      <div className="">
        <p className="text-3xl font-extrabold">Members</p>
        {users.map((user) => (
          <div key={user._id} className="">
            <UserItem user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
