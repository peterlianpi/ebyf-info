"use client";
import UserItem from "@/components/UserItem";
import { useUsers } from "@/components/useUsers";
import React, { useEffect, useState } from "react";

function VenguktePage() {
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
            <p className="text-2xl font-extrabold w-[80%]">Veng-Uk te</p>
          </div>
          {users.map((user) => (
            <div key={user._id} className="mb-2">
              {user.position === "Veng Uk" && <UserItem user={user} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default VenguktePage;
