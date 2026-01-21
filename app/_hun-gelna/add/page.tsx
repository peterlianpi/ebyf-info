"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import InputForm from "@/features/yf-service/input-form";
import ZoHunFormPage from "@/features/yf-service/zo-hun-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface FormData {
  date: string;
  hunuk: string;
  hunpi: string;
  laiSiangthoKamngahGen: string;
  laiSiangthoSimkhopna: string;
  phatnaLa: string;
  sumpiApna: string;
  duet: string;
  ahuamThungetna: string;
  groupSong: string;
  tawpna: string;
}

function ServiceEditPage() {
  const [serviceType, setServiceType] = useState<string>("zo-hun");
  const [formData, setFormData] = useState<FormData>({
    date: "",
    hunuk: "",
    hunpi: "",
    laiSiangthoKamngahGen: "",
    laiSiangthoSimkhopna: "",
    phatnaLa: "",
    sumpiApna: "",
    duet: "",
    ahuamThungetna: "",
    groupSong: "",
    tawpna: "",
  });
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleServiceChange = (type: string) => {
    setServiceType(type);
  };

  // useCallback to avoid unnecessary re-renders
  const handleFormDataChange = useCallback((newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  // Export to PDF (with high resolution)
  const exportToPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      scale: 4, // Increase scale for high resolution
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", [310, 430]); // Same dimensions as the image
    pdf.addImage(imgData, "PNG", 0, 0, 310, 430); // Adjusted size
    pdf.save("zo-hun-form.pdf");
  };

  // Export to Image (PNG)
  const exportToImage = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      scale: 4, // Ensure high-quality resolution
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = "zo-hun-form-highres.png";
    link.href = canvas.toDataURL("image/png", 1.0); // Full quality PNG
    link.click();
  };

  return (
    <div className="flex flex-col max-w-md gap-2 mx-auto">
      <div className="flex items-center justify-center mb-4 gap-2 flex-col">
        <p className="text-xl text-center font-extrabold mx-auto w-[80%]">
          Add Service Items
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mb-4 gap-4 flex-wrap">
        <Button onClick={() => handleServiceChange("zo-hun")}>Zo Hun</Button>
        <Button onClick={() => handleServiceChange("kawl-hun")}>
          Kawl Hun
        </Button>
        <Button onClick={() => setIsFormOpen(true)}>Add Items</Button>
        <Button onClick={exportToPDF} className="bg-red-500 hover:bg-red-600">
          Export PDF
        </Button>
        <Button
          onClick={exportToImage}
          className="bg-green-500 hover:bg-green-600"
        >
          Export 4x PNG
        </Button>
      </div>

      {/* Preview Area */}
      <div className="p-2 shadow-md bg-slate-300 rounded-lg">
        <p className="p-2 font-semibold">Preview</p>
        <div ref={previewRef}>
          <ZoHunFormPage formData={formData} />
          {/* <ZoHunSVG
            date="10.04.2025"
            hunuk="John Doe"
            hunpi="Jane Doe"
            laiSiangthoKamngahGen="Kamngah Group"
            laiSiangthoSimkhopna="Simkhopna John"
            phatnaLa="Lawi David"
            sumpiApna="Sumpi Mary"
            duet="Duet Team"
            ahuamThungetna="Speaker Paul"
            groupSong="Youth Group"
            tawpna="Closing Prayer"
          /> */}
        </div>
      </div>

      {/* Input Form Modal */}
      <InputForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formData={formData}
        setFormData={handleFormDataChange}
      />
    </div>
  );
}

export default ServiceEditPage;
