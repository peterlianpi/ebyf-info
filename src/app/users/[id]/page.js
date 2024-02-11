"use client";

import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useUsers } from "@/components/useUsers";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function EditUserPage() {
  const { loading, isAdmin } = useProfile();
  const { users, usersLoading, fetchUsers } = useUsers();
  const { id } = useParams();
  const user = users.find((u) => u._id === id);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });

      if (response.ok) {
        resolve();
        setSaved(true);
      } else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  if (saved) {
    setSaved(false);
    return redirect("/users");
  }

  if (loading || usersLoading) {
    return "Loading user profile";
  }
  if (!isAdmin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
