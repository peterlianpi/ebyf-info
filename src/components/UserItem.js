"use client";

import React from "react";
import Image from "next/image";
import { useUsers } from "./UsersContext";

export default function UserItem() {
  const {users} = useUsers();

  console.log("Users :", users);
  function handleCall(phone) {
    window.open(`tel:${phone}`);
  }

  return (
    <div className="flex max-w-md gap-2 mx-auto">
      {users.map((user) => (
        <div key={user._id} className="">
          <div className="">
            <Image src={user.image} alt="alt" width={250} height={250} />
          </div>
          <div className="">Name :{user.name}</div>
          <div>
            <p>Phone Number: {user.phone} </p>
            <button onClick={() => handleCall(user.phone)}>Call</button>
          </div>
          <div className="">Role : {user.role}</div>
          <div className="">Veng : {user.veng}</div>
          <div className="">Facebook Profile : {user.fb}</div>
        </div>
      ))}
    </div>
  );
}
