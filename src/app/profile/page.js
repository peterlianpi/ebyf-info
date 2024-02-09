"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";

function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const inputFileRef = useRef(null);
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [veng, setVeng] = useState("");
  const [fb, setFb] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setRole(data.role);
          setVeng(data.veng);
          setFb(data.fb);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Context-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          role,
          veng,
          fb,
        }),
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

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
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
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
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
              value={session.data.user?.email}
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
    </section>
  );
}
export default ProfilePage;
