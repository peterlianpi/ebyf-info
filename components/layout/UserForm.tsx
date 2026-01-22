"use client";
import React from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProfile } from "../UseProfile";

interface UserData {
  name?: string;
  image?: string;
  email?: string;
  phone?: string;
  role?: string;
  position?: string;
  veng?: string;
  fb?: string;
}

interface FormData {
  name: string;
  image: string;
  phone: string;
  email: string;
  role: string;
  position: string;
  veng: string;
  fb: string;
}

interface UserFormProps {
  user?: UserData;
  onSave: (ev: React.FormEvent<HTMLFormElement>, data: FormData) => void;
}

export default function UserForm({ user, onSave }: UserFormProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "/profile.png");
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

  async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    ev.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(inputFileRef.current as any)?.files) {
      throw new Error("No file selected for profile");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file = (inputFileRef.current as any).files[0];
    const data = new FormData();
    data.set("file", file);

    const toastId = toast.loading("Uploading...");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        const link = await response.json();
        setImage(link);
        toast.success("Upload complete", { id: toastId });
      } else {
        throw new Error("Failed to upload");
      }
    } catch (error) {
      toast.error("Upload error", { id: toastId });
    }
  }

  return (
    <div>
      <div className="flex flex-col max-w-md gap-2">
        <div className=" w-62.5  mx-auto">
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
          <div className="space-y-2">
            <Label htmlFor="fullname">Full name</Label>
            <Input
              id="fullname"
              type="text"
              value={userName}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(ev: any) => setUserName(ev.target.value)}
              placeholder="Full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              disabled={path === "/profile"}
              placeholder="Email address"
              value={email}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(ev: any) => setEmail(ev.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone number"
              value={phone}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(ev: any) => setPhone(ev.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              type="text"
              placeholder="Role"
              value={role}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(ev: any) => setRole(ev.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              type="text"
              placeholder="Position"
              disabled={
                (path === "/profile" || path === "/addusers") && !isAdmin
              }
              value={position}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(ev: any) => setPosition(ev.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="veng">Veng</Label>
            <Select value={veng} onValueChange={setVeng}>
              <SelectTrigger>
                <SelectValue placeholder="Select Veng" />
              </SelectTrigger>
              <SelectContent>
                {vengList.map((vengItem) => (
                  <SelectItem key={vengItem} value={vengItem}>
                    {vengItem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fb">Facebook Profile</Label>
            <Input
              id="fb"
              type="text"
              placeholder="Facebook Profile"
              value={fb}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(ev: any) => setFb(ev.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
