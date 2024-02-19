"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";
import { useProfile } from "@/components/UseProfile";
import Loading from "@/components/icons/Loading";

function ProfilePage() {
  const { loading, user, isAdmin, profileFetched, status } = useProfile();

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Context-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  if (status === "loading" || !profileFetched) {
    return (
      <div className="flex items-center text-center max-w-md mx-auto justify-center">
        <Loading />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
export default ProfilePage;
