"use client";
import React from "react";
import { useUsers } from "@/components/UsersContext";
import UserItem from "@/components/UserItem";

export default function UserListPage() {
  const users = useUsers();

  return (
    <div
      className="flex max-w-md gap-2 mx-auto
    flex-col"
    >
      <p className="text-3xl font-extrabold">Members</p>
      {users?.map((user) => (
        <div key={user._id} className="">
          <UserItem user={user} />
        </div>
      ))}
    </div>
  );
}
