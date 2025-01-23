"use client";

import React, { useState } from "react";
import Image from "next/image";
import Phone from "./icons/Phone";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import PeriodDisplay from "./periodShow";

export default function UserItem({ user }) {
  const {id, name, number, roles, phone, image, veng, fbLink } = user;
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
    <section key={id} className="flex items-center gap-4   border-2  hover:bg-primary-foreground  rounded-lg  justify-start px-4  h-[90px]  ">
      <Avatar className="border -z-1 border-emerald-600">
        <AvatarImage src={image} />
        <AvatarFallback className="bg-sky-500">
          <User className="text-white" />
        </AvatarFallback>
      </Avatar>

      <div
        className="ml-2 w-[64%] cursor-pointer"
        onClick={() => handleUserClick(user)}
      >
        <div className="font-semibold text-base max-md:text-sm ">{name}</div>

        {roles && roles.length > 0 ? (
          roles
            .filter(
              (role) =>
                // Filter EBYF roles and exclude unwanted ones
                role.role.name.includes("EBYF") &&
                !["Blood", "Library", "Mopuan", "Sunday"].some((excludedRole) =>
                  role.role.name.includes(excludedRole)
                )
            )
            .map((role, index) => {
              // If the role contains "EBYF - Veng Uk", include the veng name
              if (role.role.name.includes("Veng Uk")) {
                return (
                  <div key={index} className="text-sm max-md:text-xs">
                    {`EBYF - ${veng ? `${veng} ` : ""}Veng Uk`}
                  </div>
                );
              }
              // For other valid EBYF roles
              return (
                <div className="text-sm max-md:text-xs" key={index}>
                  {role.role.name}
                </div>
              );
            })
        ) : (
          <div>No Role</div>
        )}
      </div>
      <div>
        <div onClick={() => handleCall(phone)}>
          <Phone />
        </div>
      </div>
      {/* {Modal to display user details} */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-md mx-auto">
          <div className="bg-secondary text-primary p-4 rounded-lg w-[350px]">
            <p className="text-xl font-semibold mb-2">{selectedUser.name}</p>
            {selectedUser?.email && (
              <p className="mb-2">Email: {selectedUser?.email}</p>
            )}
            {selectedUser?.phone && (
              <div className="mb-2">
                <p>Phone:</p>
                {selectedUser?.phone.split(",").map((num, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mr-4 mb-2"
                  >
                    <span className="mr-2">{num.trim()}</span>
                    <div onClick={() => handleCall(num.trim())}>
                      <Phone />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedUser?.roles && selectedUser?.roles.length > 0 && (
              <div className="mb-2">
                <p>Roles:</p>
                <div className="h-40 overflow-auto">
                  {selectedUser?.roles.map((role, index) =>
                    role.role.name.includes("Veng Uk") ? (
                      <div className="max-md:text-sm" key={index}>
                        {"EBYF - "}
                        {veng ? `${veng} ` : ""}
                        {role.role.name.replace("EBYF -", "").trim()}
                        <br />{" "}
                        <PeriodDisplay
                          startedAt={role.startedAt}
                          endedAt={role.endedAt}
                        />
                      </div>
                    ) : (
                      <div className="max-md:text-sm" key={index}>
                        {role.role.name}
                        <br />
                        <PeriodDisplay
                          startedAt={role.startedAt}
                          endedAt={role.endedAt}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
            {selectedUser?.veng && (
              <p className="mb-2">Veng: {selectedUser.veng}</p>
            )}
            {selectedUser?.fbLink && (
              <div className="flex p-4 justify-center">
                <a
                  href={selectedUser?.fbLink}
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
            <Button onClick={handleCloseModal} className="w-full">
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
