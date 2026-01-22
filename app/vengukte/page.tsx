"use client";

import { Skeleton } from "@/components/ui/skeleton";
import UserItem from "@/components/user-item";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import { useEffect, useState } from "react";
import { User } from "@/types";

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

  if (usersLoading) {
    return (
      <div className="flex flex-col max-w-md gap-2 mx-auto">
        <div>
          <div className="flex items-center justify-start">
            <p className="text-2xl mb-4 font-extrabold w-[80%]">Veng-Uk te</p>
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-md gap-2 mx-auto">
      <div>
        <div className="flex items-center justify-start">
          <p className="text-2xl mb-4 font-extrabold w-[80%]">Veng-Uk te</p>
        </div>
        {filteredUsers.map((user) => (
          <div key={user.id} className="mb-2">
            <UserItem user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VenguktePage;
