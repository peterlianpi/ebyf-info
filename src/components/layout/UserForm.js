"use client";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useProfile } from "../UseProfile";

export default function UserForm({ user, onSave }) {
  const inputFileRef = useRef(null);
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [role, setRole] = useState(user?.role || "");
  const [position, setPosition] = useState(user?.position || "");
  const [veng, setVeng] = useState(user?.veng || "");
  const [fb, setFb] = useState(user?.fb || "");
  const path = usePathname();
  const [saved, setSaved] = useState(false);
  const { isAdmin } = useProfile();
  const vengList = [
    "Kadesh",
    "Joppa",
    "Salem",
    "Hermon",
    "Canaan",
    "Eden",
    "Shechem",
    "Hebron",
    "Galilee",
    "Nazareth",
    "Lebanon",
    "Gilgal",
    "Bethel",
    "Bethsaida",
    "Macedonia",
    "Zion",
    "Carmel",
  ];

  useEffect(() => {
    if (image.length === 0) {
      setImage("/profile.png");
    }
  }, [image]);

  if (saved && path === "/addusers") {
    // Reset form fields
    setUserName("");
    setEmail("");
    setImage("");
    setPhone("");
    setRole("");
    setPosition("");
    setVeng("");
    setFb("");
    setSaved(false);
  }

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
      <div className="flex flex-col max-w-md gap-2">
        <div className=" w-[250px]  mx-auto">
          <div className="relative p-2 rounded-lg ">
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
          onSubmit={(ev) => {
            onSave(ev, {
              name: userName,
              image,
              phone,
              email,
              role,
              position,
              veng,
              fb,
            });
            setSaved(true);
          }}
        >
          <label>Full name</label>
          <input
            type="text"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            placeholder="Full name"
            required
          />
          <label>Email</label>
          <input
            type="email"
            disabled={path === "/profile" ? true : ""}
            placeholder="Email address"
            value={email}
            className=""
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label>Phone</label>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            required
          />
          <label>Role</label>
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(ev) => setRole(ev.target.value)}
          />
          <label>Position</label>
          <input
            type="text"
            placeholder="Position"
            disabled={
              (path === "/profile" || path === "/addusers") && !isAdmin
                ? true
                : ""
            }
            value={position}
            onChange={(ev) => setPosition(ev.target.value)}
          />
          <label>Veng</label>
          <select
            className=""
            value={veng}
            onChange={(ev) => setVeng(ev.target.value)}
          >
            <option value="">Select Veng</option>
            {vengList.map((vengItem) => (
              <option key={vengItem} value={vengItem}>
                {vengItem}
              </option>
            ))}
          </select>
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
