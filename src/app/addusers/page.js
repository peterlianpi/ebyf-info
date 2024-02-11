"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import UserForm from "@/components/layout/UserForm";
const AddUserInfoForm = () => {
  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Context-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else {
        const data = await response.json();
        reject(data.error || "Failed to save user information");
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: `New profile saved!`,
      error: (error) => {
        return typeof error === "string" ? error : "Error";
      },
    });
  }

  return (
    <>
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
