"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UserItem from "@/components/user-item";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import { User } from "@/types";

export function MakaiteClient() {
  const [usersLoading, setUsersLoading] = useState<boolean>(true);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAndFilterUsers = async () => {
      setUsersLoading(true);
      const users = await filterLocalMembersByRole({
        includedRoles: [
          "EBYF - President",
          "EBYF - Vice President",
          "EBYF - Secretary",
          "EBYF - Assistant Secretary",
          "EBYF - Treasurer",
          "EBYF - Accountant",
          "EBYF - Member",
        ],
      });

      const sorted = users.sort((a, b) => (a.number || 0) - (b.number || 0));
      setFilteredUsers(sorted);
      setUsersLoading(false);
    };

    fetchAndFilterUsers();
  }, []);

  if (usersLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredUsers.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}