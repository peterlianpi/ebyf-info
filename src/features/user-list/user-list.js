"use client";

import { useUsers } from "@/hooks/useUsers";
import Refresh from "@/components/icons/Refresh";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UserItem from "@/components/user-item";

export default function UserListPage() {
  const { users, fetchUsers, usersLoading } = useUsers("");

  // Filter users based on the role "Veng Uk"
  const filteredUsers = users.sort((a, b) => a.id - b.id); // Sort users by number in ascending order;

  const handleRefresh = () => {
    fetchUsers();
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (usersLoading) {
    return <LoadingPage handleRefresh={handleRefresh} />;
  }

  return (
    <>
      {!usersLoading && users && (
        <div className="flex flex-col max-w-md gap-2 mx-auto">
          <div className="">
            <div className="flex items-center justify-start">
              <p className="text-3xl font-extrabold w-[80%]">All Members</p>
              <button
                className="flex items-center justify-center  px-2 py-2 font-sans font-semibold tracking-wide border-none  rounded-lg  h-[60px] w-[60px] "
                onClick={handleRefresh}
                aria-label="Refresh"
              >
                <Refresh />
              </button>
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

const LoadingPage = (handleRefresh) => {
  return (
    <>
      <div className="flex flex-col max-w-md gap-2 mx-auto">
        <div className="">
          <div className="flex items-center justify-start">
            <p className="text-3xl font-extrabold w-[80%]">All Members</p>
            <button
              className="flex items-center justify-center  px-2 py-2 font-sans font-semibold tracking-wide border-none  rounded-lg  h-[60px] w-[60px] "
              onClick={handleRefresh}
              aria-label="Refresh"
            >
              <Refresh />
            </button>
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
