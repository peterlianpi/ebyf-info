import React, { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function UploadImage() {
  const inputFileRef = useRef(null);
  const [image, setImage] = useState(user?.image || "");

  useEffect(() => {
    if (image.length === 0) {
      setImage("/profile.png");
    }
  }, [image]);

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
  );
}
