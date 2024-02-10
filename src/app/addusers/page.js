"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { useUsers } from "@/components/useUsers";
import UserForm from "@/components/layout/UserForm";
const AddUserInfoForm = () => {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const { status } = session;
  const { userAdded, setUserAdded, fetchUsers } = useUsers();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setIsAdmin(data.admin);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    setUserAdded(false);
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Context-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setUserAdded(true);
        resolve();
      } else {
        const data = await response.json();
        reject(data.error || "Failed to save user information");
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: (error) => {
        return typeof error === "string" ? error : "Error";
      },
    });
  }

  return (
    <>
      <UserTabs isAdmin={isAdmin} />
      <div className="flex flex-col mx-auto mt-8 max-w-md">
        <p className="mb-2 text-xl font-semibold text-center text-gray-500 uppercase">
          Add User-Info
        </p>
        <UserForm onSave={handleProfileInfoUpdate} />
      </div>
    </>
  );
};

export default AddUserInfoForm;
