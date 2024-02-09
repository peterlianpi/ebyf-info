"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
const AddUserInfoForm = () => {
  const [name, setName] = useState("");
  const inputFileRef = useRef(null);
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [veng, setVeng] = useState("");
  const session = useSession();
  const [fb, setFb] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setIsAdmin(data.admin);
        });
      });
    }
  }, [session, status]);

  useEffect(() => {
    if (image.length === 0) {
      setImage("/profile.png");
    }
  }, [image]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/adduser", {
        method: "POST",
        headers: { "Context-Type": "application/json" },
        body: JSON.stringify({
          name,
          image,
          phone,
          role,
          veng,
          fb,
        }),
      });
      if (response.ok) resolve();
      else {
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
    <>
      <UserTabs isAdmin={isAdmin} />
      <div className="flex flex-col mx-auto mt-8">
        <p className="mb-2 text-xl font-semibold text-center text-gray-500 uppercase">
          Add User-Info
        </p>
        <div className="relative h-[200px] items-center  w-[200px] p-2 mx-auto mb-4 bg-gray-200 rounded-lg ">
          {image && (
            <Image
              className="w-full h-full mb-1 rounded-lg"
              src={image}
              width={100}
              height={100}
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
            <span className="absolute bottom-0 left-0 right-0 block p-2 text-center border border-gray-300 rounded-lg cursor-pointer">
              Upload Profile Photo
            </span>
          </label>
        </div>
      </div>
      <form className="max-w-md mx-auto" onSubmit={handleProfileInfoUpdate}>
        <label>
          Full name:
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Full name"
            onChange={(ev) => setName(ev.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            placeholder="example@example.com"
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={phone}
            placeholder="09xxxxxxxxx"
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={role}
            placeholder="My role name"
            onChange={(ev) => setRole(ev.target.value)}
          />
        </label>
        <label>
          Veng:
          <input
            type="text"
            name="veng"
            value={veng}
            placeholder="Veng"
            onChange={(ev) => setVeng(ev.target.value)}
          />
        </label>
        <label>
          Facebook Profile:
          <input
            type="text"
            name="fb"
            value={fb}
            placeholder="facebook profile link"
            onChange={(ev) => setFb(ev.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddUserInfoForm;
