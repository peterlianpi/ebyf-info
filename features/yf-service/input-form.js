"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function InputForm({ isOpen, onClose, formData, setFormData }) {
  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("serviceFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("serviceFormData", JSON.stringify(formData));
    console.log("Saved Data:", formData);
    onClose(); // Close modal after saving
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-md:w-[340px] mx-auto rounded-lg p-4">
        <DialogHeader className="p-2">
          <DialogTitle>Add Service Items</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2">

          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="hunuk"
            placeholder="Hunuk"
            value={formData.hunuk}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="hunpi"
            placeholder="Hunpi"
            value={formData.hunpi}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="tawpna"
            placeholder="Hunzawh Lungdamkohna"
            value={formData.tawpna}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="laiSiangthoKamngahGen"
            placeholder="Lai Siangtho Kamngah Gen"
            value={formData.laiSiangthoKamngahGen}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="laiSiangthoSimkhopna"
            placeholder="Lai Siangtho Simkhopna"
            value={formData.laiSiangthoSimkhopna}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="phatnaLa"
            placeholder="Phatna La"
            value={formData.phatnaLa}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="sumpiApna"
            placeholder="Sumpi Apna"
            value={formData.sumpiApna}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="duet"
            placeholder="Duet"
            value={formData.duet}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="ahuamThungetna"
            placeholder="Ahuam Thungetna"
            value={formData.ahuamThungetna}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="groupSong"
            placeholder="Group Song"
            value={formData.groupSong}
            onChange={handleChange}
          />

          <DialogFooter className="flex justify-end gap-2 space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InputForm;
