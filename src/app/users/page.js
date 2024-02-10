"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Edit from "@/components/icons/Edit";
import Delete from "@/components/icons/Delete";
import { toast } from "react-hot-toast";

export default function UsersPage() {
  const { data, loading } = useProfile();
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info";
  }
  if (!data.admin) {
    return "Not an admin";
  }

  async function handleDelete(user) {
    console.log("User to delete : ", user);
    const id = user._id;
    const name = user.name;
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
      });

      if (response.ok) {
        setUsers(users.filter((u) => u._id !== id));
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
      <UserTabs isAdmin={true} />
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
