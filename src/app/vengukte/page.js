"use client";

import { Skeleton } from "@/components/ui/skeleton";
import UserItem from "@/components/user-item";
import { useUsers } from "@/hooks/useUsers";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import React, { useEffect, useState } from "react";

function VenguktePage() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { usersLoading, setUsersLoading } = useUsers();

  useEffect(() => {
    const fetchAndFilterUsers = async () => {
      setUsersLoading(true);
      const users = await filterLocalMembersByRole({
        keywords: "Veng Uk",
      });

      const sorted = users.sort((a, b) => a.number - b.number);
      setFilteredUsers(sorted);
      setUsersLoading(false);
    };

    fetchAndFilterUsers();
  }, []);

  if (usersLoading) {
    return <LoadingComponent />;
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

export const LoadingComponent = () => {
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
};
