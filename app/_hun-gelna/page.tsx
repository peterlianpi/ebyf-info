"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";

function HunGelnaPage() {
  const imageUrl = "/yf-service.png";

  // Function to handle image download
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "service-image.png"; // Define the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col max-w-md gap-2 mx-auto">
      <div className="flex items-center justify-center mb-4 gap-2 flex-col">
        <p className="text-xl text-center font-extrabold mx-auto w-[80%]">
          YF Service Program
        </p>
        <div className="space-x-2">
          <Button onClick={handleDownload} disabled={!imageUrl}>
            <DownloadIcon />
          </Button>
        </div>
      </div>

      {/* Display Image */}
      {imageUrl && (
        <div className="p-2 shadow-md bg-slate-300 rounded-lg">
          <Image
            width={800}
            height={600}
            className="rounded-lg w-full"
            src={imageUrl}
            alt="Service Program"
          />
        </div>
      )}
    </div>
  );
}

export default HunGelnaPage;
