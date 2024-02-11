"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Edit from "@/components/icons/Edit";
import Delete from "@/components/icons/Delete";
import { toast } from "react-hot-toast";
import { useUsers } from "@/components/useUsers";
import Refresh from "@/components/icons/Refresh";
import { useSession } from "next-auth/react";

export default function UsersPage() {
  const { loading, isAdmin } = useProfile();

  const { users, usersLoading, fetchUsers } = useUsers();
  const [deleted, setDeleted] = useState(false);

  const handleRefresh = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (deleted) {
      fetchUsers();
      setDeleted(false);
    }
  }, [deleted, fetchUsers]);

  if (loading || usersLoading) {
    return "Loading user info";
  }
  if (!isAdmin) {
    return "Not an admin";
  }

  async function handleDelete(user) {
    const id = user._id;
    const name = user.name;
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
      });

      if (response.ok) {
        // setUsers(users.filter((u) => u._id !== id));
        setDeleted(true);
        resolve();
      } else reject();
    });
    await toast.promise(savingPromise, {
      loading: `Delete ${name}`,
      success: `${name} Deleted`,
      error: "Error",
    });
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <div className="flex items-center justify-start">
        <p className="text-3xl font-extrabold w-[80%]">All Members</p>
        <button
          className="flex items-center justify-center  px-2 py-2 font-sans font-semibold tracking-wide border-none  rounded-lg  h-[60px] w-[60px] "
          onClick={handleRefresh}
        >
          <Refresh />
        </button>
      </div>
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 py-4 items-center justify-around gap-2 flex h-[80px] "
            >
              <div className="ml-2">
                <Image
                  className="rounded-full w-[60px] h-[60px]"
                  src={user.image}
                  alt="alt"
                  width={60}
                  height={60}
                />
              </div>
              <div className="w-[50%]">
                <div className="text-gray-900">
                  {!!user.name && <span className="">{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
              </div>
              <div className="mr-4">
                <Link href={"/users/" + user._id} className="">
                  <Edit />
                </Link>
              </div>
              <div className="mr-4" onClick={(ev) => handleDelete(user)}>
                <Delete />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
