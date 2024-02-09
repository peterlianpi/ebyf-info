"use client";

import React, { useState } from "react";
import Image from "next/image";
import Phone from "./icons/Phone";

export default function UserItem({ user }) {
  const [selectedUser, setSelectedUser] = useState(null);

  function handleCall(phone) {
    window.open(`tel:${phone}`);
  }
  function handleUserClick(user) {
    setSelectedUser(user);
  }

  function handleCloseModal() {
    setSelectedUser(null);
  }
  return (
    <section className="flex items-center py-4 justify-start px-2">
      <Image
        className="rounded-full w-[20%]"
        src={user.image}
        alt="alt"
        width={75}
        height={75}
      />

      <div
        className="ml-2 w-[65%] cursor-pointer"
        onClick={() => handleUserClick(user)}
      >
        <div className="font-semibold text-xl ">{user.name}</div>
        <div className="text-gray-600">{user.role}</div>
      </div>
      <div>
        <div onClick={() => handleCall(user.phone)}>
          <Phone />
        </div>
      </div>
      {/* {Modal to display user details} */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-xl font-semibold mb-2">{selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Role: {selectedUser.role}</p>
            <p>Veng: {selectedUser.veng}</p>
            <div className="flex p-4 justify-center">
              <a
                href={selectedUser.fb}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/facebook.png"
                  alt="Facebook Icon"
                  width={25}
                  height={25}
                />
              </a>
            </div>

            {/* Add more details as needed */}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
