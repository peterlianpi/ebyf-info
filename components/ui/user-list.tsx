"use client";

import React from "react";
import { User } from "@/types";
import UserItem from "@/components/user-item";

interface UserListProps {
  users: User[];
  maxHeight?: string;
  className?: string;
  emptyMessage?: string;
}

export default function UserList({
  users,
  maxHeight = "250px",
  className = "",
  emptyMessage = "No users found",
}: UserListProps) {
  if (users.length === 0) {
    return (
      <div className={`text-center text-muted-foreground py-8 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={`overflow-y-auto space-y-2 border rounded-lg p-2 ${className}`}
      style={{ maxHeight }}
      role="list"
      aria-label="Users list"
    >
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}