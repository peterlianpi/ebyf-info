"use client";

import UserItem from "@/components/UserItem";
import { useUsers } from "@/components/useUsers";
import Refresh from "@/components/icons/Refresh";
import SearchBox from "@/components/layout/SearchBox";
import React, { useEffect, useState } from "react";

function MakaitePage() {
  const { users, usersLoading, fetchUsers } = useUsers();

  // Ensure that this function is only executed in the client-side
  useEffect(() => {
    fetchUsers();
  }, []);

  if (usersLoading) {
    return "Loading user info...";
  }
  return (
    <>
      <div className="flex flex-col max-w-md gap-2 mx-auto">
        <div className="">
          <div className="flex items-center justify-start">
            <p className="text-2xl font-extrabold w-[80%]">Makai te</p>
          </div>
          {users.map((user) => (
            <div key={user._id} className="my-2">
              {user.role && <UserItem user={user} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MakaitePage;
