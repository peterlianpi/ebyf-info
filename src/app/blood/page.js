"use client";

import UserItem from "@/components/UserItem";
import Loading from "@/components/icons/Loading";
import { useUsers } from "@/components/useUsers";
import React, { useEffect } from "react";

function BloodPage() {
  const { users, usersLoading, fetchUsers } = useUsers();

  // Ensure that this function is only executed in the client-side
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
            <p className="text-2xl font-extrabold w-[80%]">
              Sisan Vai Contacts
            </p>
          </div>
          {users.map((user) => (
            <div key={user._id} className="mb-2">
              {user.roles?.some((role) => role.name.includes("Blood")) && (
                <UserItem user={user} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BloodPage;
