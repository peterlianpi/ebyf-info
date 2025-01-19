"use client";

import UserItem from "@/components/UserItem";
import { useUsers } from "@/components/useUsers";
import Refresh from "@/components/icons/Refresh";
import { useEffect } from "react";

export default function UserListPage() {
  const { users, fetchUsers, usersLoading } = useUsers();

  const handleRefresh = () => {
    fetchUsers();
  };
  useEffect(() => {
    fetchUsers();
  }, []);

   
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
            {users?.map((user) => (
              <div key={user._id} className="my-2">
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
