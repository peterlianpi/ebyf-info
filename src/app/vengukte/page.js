"use client";
import UserItem from "@/components/UserItem";
import Loading from "@/components/icons/Loading";
import { useUsers } from "@/components/useUsers";
import React, { useEffect, useState } from "react";

function VenguktePage() {
  const { users, usersLoading, fetchUsers } = useUsers("/vengukte"); // Modify route as needed

  // Filter users based on the role "Veng Uk"
  const filteredUsers = users
    .filter((user) =>
      user.roles.some((role) => role.role.name.includes("Veng Uk"))
    )
    .sort((a, b) => a.number - b.number); // Sort users by number in ascending order;

 

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
            <p className="text-2xl mb-4 font-extrabold w-[80%]">Veng-Uk te</p>
          </div>
          {filteredUsers.map((user) => (
            <div key={user._id} className="mb-2">
              <UserItem user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default VenguktePage;
