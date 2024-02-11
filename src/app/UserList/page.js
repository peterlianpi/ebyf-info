"use client";
import React, { useEffect, useState } from "react";

import UserItem from "@/components/UserItem";
import { useUsers } from "@/components/useUsers";
import Refresh from "@/components/icons/Refresh";
import Link from "next/link";
import SearchBox from "@/components/layout/SearchBox";

export default function UserListPage() {
  const { users, usersLoading, fetchUsers } = useUsers();

  const handleRefresh = () => {
    fetchUsers();
  };

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
        <SearchBox users={users} />
        <div className="">
          <div className="flex items-center justify-start">
            <p className="text-3xl font-extrabold w-[80%]">Members</p>
            <button
              className="flex items-center justify-center  px-2 py-2 font-sans font-semibold tracking-wide border-none  rounded-lg  h-[60px] w-[60px] "
              onClick={handleRefresh}
            >
              <Refresh />
            </button>
          </div>
          {users.map((user) => (
            <div key={user._id} className="my-2">
              {user.role && <UserItem user={user} />}
            </div>
          ))}
        </div>
        <hr />
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
        <hr />
        <div className="">
          <div className="flex items-center justify-start">
            <p className="text-2xl font-extrabold w-[80%]">Others</p>
          </div>
          {users.map((user) => (
            <div key={user._id} className="mb-2">
              {(user.position === "" || user.role === "") &&
                user.role !== "Member" &&
                user.position !== "Veng Uk" && <UserItem user={user} />}
            </div>
          ))}
        </div>
        <hr />
        <Link href={"/addusers"}>
          <button className="bg-gray-50">Add Participants</button>
        </Link>
      </div>
    </>
  );
}
