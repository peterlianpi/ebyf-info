"use client";

import React from "react";
import Image from "next/image";
import { User } from "@/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./sheet";
import { Button } from "./button";
import PeriodDisplay from "@/components/periodShow";
import Phone from "@/components/icons/Phone";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWindow = (globalThis as any).window || {};

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserModal({ user, isOpen, onClose }: UserModalProps) {
  if (!user) return null;

  const handleCall = (phone: string | undefined) => {
    if (!phone) return;
    globalWindow.open(`tel:${phone}`);
  };

  return (
       <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] md:h-auto md:max-h-[80vh]">
        <SheetHeader>
          <SheetTitle>{user.name}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4 p-4">
          {user.email && (
            <p className="text-sm">
              <strong>Email:</strong> {user.email}
            </p>
          )}
          {user.phone && (
            <div>
              <p className="text-sm font-medium mb-2">Phone:</p>
              <div className="space-y-2">
                {user.phone.split(",").map((num, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span className="text-sm">{num.trim()}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCall(num.trim())}
                      aria-label={`Call ${num.trim()}`}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {user.roles && user.roles.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Roles:</p>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {user.roles.map((role, index) => (
                  <div key={index} className="text-sm p-2 bg-muted rounded">
                    <div className="font-medium">{role.role.name}</div>
                    <PeriodDisplay
                      startedAt={role.startedAt}
                      endedAt={role.endedAt}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {user.veng && (
            <p className="text-sm">
              <strong>Veng:</strong>{" "}
              {typeof user.veng === "string"
                ? user.veng
                : user.veng.name || ""}
            </p>
          )}

          {user.fbLink && (
            <div className="flex justify-center pt-4">
              <Button variant="outline" asChild>
                <a
                  href={user.fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Facebook profile"
                >
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Facebook
                </a>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}