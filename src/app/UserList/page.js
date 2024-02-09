"use client";
import React from "react";

import UserItem from "@/components/UserItem";
import { useUsers } from "@/components/useUsers";

export default function UserListPage() {
  const { users, usersLoading } = useUsers();

  if (usersLoading) {
    return "Loading user info...";
  }
  console.log(users);

  return (
    <div
      className="flex max-w-md gap-2 mx-auto
    flex-col"
    >
      <p className="text-3xl font-extrabold">Members</p>
      {users.map((user) => (
        <div key={user._id} className="">
          <UserItem user={user} />
        </div>
      ))}
    </div>
  );
}
