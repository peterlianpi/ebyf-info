"use client";

 
import { useUsers } from "@/hooks/useUsers";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UserItem from "@/components/user-item";

function MakaitePage() {
  const { users, usersLoading, fetchUsers } = useUsers("/makaite"); // Modify route as needed

  // Filter users based on the role "Veng Uk"
  const filteredUsers = users
    .filter((user) =>
      user.roles.some((role) => role.role.name.includes("EBYF -"))
    )
    .sort((a, b) => a.number - b.number); // Sort users by number in ascending order;

  // Ensure that this function is only executed on the client-side
  useEffect(() => {
    fetchUsers();
  }, []);

  if (usersLoading) {
    return (
      <div className="flex flex-col max-w-md gap-2 mx-auto">
        <div className="">
          <div className="flex items-center justify-start">
            <p className="text-2xl mb-4 font-extrabold w-[80%]">Makai te</p>
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
    <>
      <div className="flex flex-col max-w-md gap-2 mx-auto">
        <div className="">
          <div className="flex items-center justify-start">
            <p className="text-2xl mb-4 font-extrabold w-[80%]">Makai te</p>
          </div>
          {filteredUsers.map((user) => (
            <div key={user.number} className="mb-2">
              <UserItem user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MakaitePage;
