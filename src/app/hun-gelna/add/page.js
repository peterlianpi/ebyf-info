"use client"; // Ensure this is rendered on the client side

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation"; // Correct way to get query params in Next.js 13
import React, { useState } from "react";

function ServiceEditPage() {
  // Set initial state based on the query param if available
  const [serviceType, setServiceType] = useState("zo-hun");

  // Function to handle the change in service type
  const handleServiceChange = (type) => {
    setServiceType(type);
  };

  // Determine the image path based on the selected service type
  const imagePath = serviceType === "zo-hun" ? "/zo-hun.png" : "/kawl-hun.png";

  return (
    <div className="flex flex-col max-w-md gap-2 mx-auto">
      <div>
        <div className="flex items-center justify-center mb-4 gap-2 flex-col">
          <p className="text-2xl text-center font-extrabold mx-auto w-[80%]">
            Add New Service
          </p>
        </div>

        {/* Service type buttons */}
        <div className="flex justify-center mb-4 gap-4">
          <Button onClick={() => handleServiceChange("zo-hun")}>Zo Hun</Button>
          <Button onClick={() => handleServiceChange("kawl-hun")}>
            Kawl Hun
          </Button>
        </div>

        {/* Show selected service type */}
        <div className="p-2 shadow-md bg-slate-300 rounded-lg">
          <img className="rounded-lg" src={imagePath} alt="Service Program" />
        </div>
      </div>
    </div>
  );
}

export default ServiceEditPage;
