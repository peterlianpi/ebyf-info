"use client";

import React, { useState } from "react";
import Image from "next/image";
import Phone from "./icons/Phone";

export default function UserItem({ user }) {
  const { name, role, position, phone, image } = user;
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
    <section className="flex items-center bg-gray-100 hover:bg-slate-200  rounded-lg  justify-start px-2 h-[90px]  ">
      <Image
        className="rounded-full h-[65px] w-[65px] "
        src={image}
        alt="alt"
        width={75}
        height={75}
      />

      <div
        className="ml-2 w-[64%] cursor-pointer"
        onClick={() => handleUserClick(user)}
      >
        <div className="font-semibold text-md ">{name}</div>
        {position ? (
          position === "Veng Uk" ? (
            <div className="text-gray-600">{user.veng}</div>
          ) : (
            <div className="text-gray-600">{position}</div>
          )
        ) : (
          <div className="text-gray-600">{role}</div>
        )}
      </div>
      <div>
        <div onClick={() => handleCall(phone)}>
          <Phone />
        </div>
      </div>
      {/* {Modal to display user details} */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-w-md">
          <div className="bg-white p-4 rounded-lg w-[320px]">
            <p className="text-xl font-semibold mb-2">{selectedUser.name}</p>
            {selectedUser.email && (
              <p className="mb-2">Email: {selectedUser.email}</p>
            )}
            {selectedUser.phone && (
              <p className="mb-2">Phone: {selectedUser.phone}</p>
            )}
            {selectedUser.position && (
              <p className="mb-2">Position: {selectedUser.position}</p>
            )}
            {selectedUser.veng && (
              <p className="mb-2">Veng: {selectedUser.veng}</p>
            )}
            {selectedUser.fb && (
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
            )}

            {/* Add more details as needed */}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
