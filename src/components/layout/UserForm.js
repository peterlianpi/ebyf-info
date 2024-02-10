"use client";
import React from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useState, useRef } from "react";

export default function UserForm({ user, onSave, onUpload }) {
  const inputFileRef = useRef(null);
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [role, setRole] = useState(user?.role || "");
  const [veng, setVeng] = useState(user?.veng || "");
  const [fb, setFb] = useState(user?.fb || "");

  async function handleFileChange(ev) {
    ev.preventDefault();
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected for profile");
    }
    const file = inputFileRef.current.files[0];
    const data = new FormData();
    data.set("file", file);

    const uploadPromise = fetch("/api/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      if (response.ok) {
        return response.json().then((link) => {
          setImage(link);
        });
      }
      throw new Error("Failed to upload");
    });

    await toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: "Upload complete",
      error: "Upload error",
    });
  }

  return (
    <div>
      <div className="flex gap-2">
        <div>
          <div className="relative p-2 rounded-lg max-w-[120px]">
            {image && (
              <Image
                className="w-full h-full mb-1 rounded-lg"
                src={image}
                width={250}
                height={250}
                alt={"avatar"}
              />
            )}
            <label>
              <input
                type="file"
                ref={inputFileRef}
                required
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="block p-2 text-center border border-gray-300 rounded-lg cursor-pointer">
                Edit
              </span>
            </label>
          </div>
        </div>
        <form
          className="grow"
          onSubmit={(ev) =>
            onSave(ev, {
              name: userName,
              image,
              phone,
              role,
              veng,
              fb,
            })
          }
        >
          <label>First and last name</label>
          <input
            type="text"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            placeholder="First and last name"
          />
          <label>Email</label>
          <input
            type="email"
            disabled={true}
            value={user?.email}
            className=""
          />
          <label>Phone</label>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
          <label>Role</label>
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(ev) => setRole(ev.target.value)}
          />
          <label>Veng</label>
          <input
            type="text"
            placeholder="Veng"
            value={veng}
            onChange={(ev) => setVeng(ev.target.value)}
          />
          <label>Facebook Profile</label>
          <input
            type="text"
            placeholder="Facebook Profile"
            value={fb}
            onChange={(ev) => setFb(ev.target.value)}
          />

          <button type="submit" className="">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
