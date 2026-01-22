"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User as UserIcon } from "lucide-react";
import UserModal from "./ui/user-modal";
import Phone from "./icons/Phone";
import { User } from "@/types";

interface UserItemProps {
  user: User;
}

export default function UserItem({ user }: UserItemProps) {
  const { id, name, number, roles, phone, image, veng, fbLink } = user;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function handleCall(phone: string | undefined) {
    if (!phone) return;
    window.open(`tel:${phone}`);
  }
  function handleUserClick(user: User) {
    setSelectedUser(user);
  }

  function handleCloseModal() {
    setSelectedUser(null);
  }
  return (
    <section
      key={id}
      className="flex items-center gap-4   border-2  hover:bg-primary-foreground  rounded-lg  justify-start px-4  h-22.5  "
    >
      <Avatar className="border -z-1 border-emerald-600">
        <AvatarImage src={image} />
        <AvatarFallback className="bg-sky-500">
          <UserIcon className="text-white" />
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
                !["Blood", "Library", "Mopuan", "Sunday", "Talent", "Sum"].some(
                  (excludedRole) => role.role.name.includes(excludedRole),
                ),
            )
            .map((role, index) => {
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
      {/* User modal */}
      <div className="">
        <UserModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={handleCloseModal}
      />
      </div>
    </section>
  );
}
