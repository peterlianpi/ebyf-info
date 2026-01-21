"use client";

import UserItem from "@/components/user-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/useUsers";
import React, { useEffect } from "react";

function MopuanPage() {
  // Pass the route to fetch users for a specific role or endpoint
  const { users, usersLoading, fetchUsers } = useUsers("/mopuan?orgId=1"); // Modify route as needed

  // Ensure that this function is only executed in the client-side
  useEffect(() => {
    fetchUsers();
  }, []);

  if (usersLoading) {
    return (
      <div className="flex flex-col max-w-md gap-2 mx-auto">
        <div className="">
          <div className="flex items-center justify-start">
            <p className="text-2xl mb-4 font-extrabold w-[80%]">
              Mopuan Vai Contacts
            </p>
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
            <p className="text-2xl mb-4 font-extrabold w-[80%]">
              Mopuan Vai Contacts
            </p>
          </div>
          {/* Display all users fetched from the specified route */}
          {users.map((user) => (
            <div key={user.id} className="mb-2">
              <UserItem user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MopuanPage;
