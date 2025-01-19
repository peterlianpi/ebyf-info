"use client";

import UserItem from "@/components/UserItem";
import { useUsers } from "@/components/useUsers";
import Loading from "@/components/icons/Loading";
import React, { useEffect } from "react";

function MakaitePage() {
  const { users, usersLoading, fetchUsers } = useUsers();

  // Ensure that this function is only executed on the client-side
  useEffect(() => {
    fetchUsers();
  }, []);

  if (usersLoading) {
    return (
      <div className="flex items-center text-center max-w-md mx-auto justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col max-w-md gap-2 mx-auto">
        <div className="">
          <div className="flex items-center justify-start">
            <p className="text-2xl font-extrabold w-[80%]">Makai te</p>
          </div>
          {users.map((user) => {
            // Filter roles: only keep those that include 'EBYF' but not 'Veng Uk'
            const filteredRoles = user.roles.filter(
              (role) => role.name.includes("EBYF") && !role.name.includes("Veng Uk")
            );

            // Only render UserItem if there are valid filtered roles
            return filteredRoles.length > 0 ? (
              <div key={user._id} className="my-2">
                <UserItem
                  user={{
                    ...user,
                    roles: filteredRoles, // Pass only the filtered roles
                  }}
                />
              </div>
            ) : null; // Don't render if no valid roles
          })}
        </div>
      </div>
    </>
  );
}

export default MakaitePage;
