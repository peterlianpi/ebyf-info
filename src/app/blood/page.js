"use client";

import UserItem from "@/components/user-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/useUsers";
import React, { useEffect } from "react";

function BloodPage() {
  const { users, usersLoading, fetchUsers } = useUsers("/blood"); // Modify route as needed

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
              Sisan Vai Contacts
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
              Sisan Vai Contacts
            </p>
          </div>
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

export default BloodPage;
