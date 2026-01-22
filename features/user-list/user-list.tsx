"use client";

import { useUsers } from "@/hooks/useUsers";
import Refresh from "@/components/icons/Refresh";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UserItem from "@/components/user-item";
import { User } from "@/types";

export default function UserListPage() {
  const { users, fetchUsers, usersLoading } = useUsers("");

  // Filter users based on the role "Veng Uk"
  const filteredUsers = users.sort((a: User, b: User) => parseInt(a.id) - parseInt(b.id)); // Sort users by number in ascending order;

  const handleRefresh = () => {
    fetchUsers();
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (usersLoading) {
    return LoadingPage(handleRefresh);
  }

  return (
    <>
      {!usersLoading && users && (
        <div className="flex flex-col max-w-md gap-2 mx-auto">
          <div className="">
            <div className="flex items-center justify-start">
              <p className="text-3xl font-extrabold w-[80%]">All Members</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                aria-label="Refresh"
              >
                <Refresh className="w-4 h-4" />
              </Button>
            </div>
            {filteredUsers?.map((user) => (
              <div key={user.id} className="my-2">
                {user && <UserItem user={user} />}
              </div>
            ))}
          </div>
          <hr />
        </div>
      )}
    </>
  );
}

const LoadingPage = (handleRefresh: () => void) => {
  return (
    <>
      <div className="flex flex-col max-w-md gap-2 mx-auto">
        <div className="">
          <div className="flex items-center justify-start">
            <p className="text-3xl font-extrabold w-[80%]">All Members</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              aria-label="Refresh"
            >
              <Refresh className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};
