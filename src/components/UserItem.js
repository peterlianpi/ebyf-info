"use client";

import React from "react";
import Image from "next/image";
import { useUsers } from "./UsersContext";
import Phone from "./icons/Phone";

export default function UserItem() {
  const users = useUsers();

  console.log("Users :", users);
  function handleCall(phone) {
    window.open(`tel:${phone}`);
  }

  return (
    <div
      className="flex max-w-md gap-2 mx-auto
    flex-col"
    >
      <p className="text-3xl font-extrabold">Members</p>
      {users.map((user) => (
        <div
          key={user._id}
          className="flex items-center py-4 justify-start px-2"
        >
          <Image
            className="rounded-full w-[20%]"
            src={user.image}
            alt="alt"
            width={75}
            height={75}
          />

          <div className="ml-2 w-[65%]">
            <div className="font-semibold text-xl ">{user.name}</div>
            <div className="text-gray-600">{user.role}</div>
          </div>
          <div>
            <div onClick={() => handleCall(user.phone)}>
              <Phone />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
