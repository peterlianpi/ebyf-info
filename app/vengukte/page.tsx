"use client";

import { Skeleton } from "@/components/ui/skeleton";
import UserItem from "@/components/user-item";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { PageHeader } from "@/components/PageHeader";

function VenguktePage() {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndFilterUsers = async () => {
      setUsersLoading(true);
      const users = await filterLocalMembersByRole({
        keywords: "Veng Uk",
      });

      const sorted = users.sort((a, b) => (a.number || 0) - (b.number || 0));
      setFilteredUsers(sorted);
      setUsersLoading(false);
    };

    fetchAndFilterUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-2">
      <PageHeader
        title="Veng-Uk te"
        description="Veng Uk division members"
      />

      {usersLoading ? (
        <div className="space-y-4">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VenguktePage;
