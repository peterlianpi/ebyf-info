"use client";
import UserItem from "@/components/UserItem";
import PeriodDisplay from "@/components/periodShow";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/components/useUsers";
import React, { useEffect } from "react";

function LibraryPage() {
  const { users, usersLoading, fetchUsers } = useUsers("/library"); // Modify route as needed

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
              Library Vai Contacts
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
              Library Vai Contacts
            </p>
          </div>
          {users.map((user) => {
            // Filter roles: only keep those that include 'Library'
            const filteredRoles = user.roles.filter((role) =>
              role.role.name.includes("Library")
            );

            // Only render UserItem if there are valid filtered roles
            return filteredRoles.length > 0 ? (
              <div key={user.id} className="my-2">
                <div>
                  <PeriodDisplay
                    startedAt={filteredRoles[0].startedAt}
                    endedAt={filteredRoles[0].endedAt}
                  />
                </div>
                <UserItem user={user} />
              </div>
            ) : null; // Don't render if no valid roles
          })}
        </div>
      </div>
    </>
  );
}

export default LibraryPage;
