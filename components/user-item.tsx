"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { User as UserIcon, Phone, Copy } from "lucide-react";
import UserModal from "./ui/user-modal";
import { User } from "@/types";
import { copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWindow = (globalThis as any).window || {};

interface UserItemProps {
  user: User;
}

export default function UserItem({ user }: UserItemProps) {
  const { id, name, number, roles, phone, image, veng, fbLink } = user;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function handleCall(phone: string | undefined) {
    if (!phone) return;
    globalWindow.open(`tel:${phone}`);
  }
  function handleUserClick(user: User) {
    setSelectedUser(user);
  }

  function handleCloseModal() {
    setSelectedUser(null);
  }

  async function handleCopyPhone(phone: string) {
    try {
      await copyToClipboard(phone);
      toast.success(`Phone number copied: ${phone}`);
    } catch (error) {
      toast.error("Failed to copy phone number");
    }
  }
  return (
    <Card className="hover:shadow-md transition-shadow ">
      <CardContent className="px-4">
        <div className="flex items-center  gap-4">
          <Avatar className="border-2 border-emerald-600 w-14 h-14">
            <AvatarImage src={image} />
            <AvatarFallback className="bg-primary/10">
              <UserIcon className="text-primary" />
            </AvatarFallback>
          </Avatar>

          <button
            className="flex-1 text-left min-w-0 hover:bg-muted/50 rounded p-2 -m-2 transition-colors"
            onClick={() => handleUserClick(user)}
            aria-label={`View details for ${name}`}
          >
            <div className="font-semibold text-base truncate">{name}</div>
            {roles && roles.length > 0 ? (
              roles
                .filter(
                  (role) =>
                    role.role.name.includes("EBYF") &&
                    !["Blood", "Library", "Mopuan", "Sunday", "Talent", "Sum"].some(
                      (excludedRole) => role.role.name.includes(excludedRole),
                    ),
                )
                .map((role, index) => (
                  <div className="text-sm text-muted-foreground" key={index}>
                    {role.role.name}
                  </div>
                ))
            ) : (
              <div className="text-sm text-muted-foreground">No Role</div>
            )}
          </button>

          <div className="flex gap-1">
            <Button
              onClick={() => handleCopyPhone(phone || "")}
              variant="ghost"
              size="sm"
              aria-label={`Copy phone number for ${name}`}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleCall(phone)}
              variant="ghost"
              size="sm"
              aria-label={`Call ${name}`}
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>

          <UserModal
            user={selectedUser}
            isOpen={!!selectedUser}
            onClose={handleCloseModal}
          />
        </div>
      </CardContent>
    </Card>
  );
}
