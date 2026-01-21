import React from "react";

function ZoHunFormPage({ formData }) {
  console.log("Data : ", formData);
  // Format date as "5.4.2025"
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  const currentDate = formatDate(formData?.date || new Date());

  return (
    <div className="relative w-[310px] h-[430px] mx-auto flex items-center justify-center">
      {/* Image */}
      <img
        className="relative w-full h-full rounded-lg "
        src="/zo-hun.png" // Image stored in the public folder
        alt="Service Program"
      />

      {/* Date positioned over image */}
      <p className="absolute text-[.54rem] text-black top-[13.5%] right-[4%] bg-transparent">
        {currentDate}
      </p>

      {/* Hunuk leh Hunpi */}
      <div className="absolute text-[.54rem]  text-black top-[19.1%] right-[26.5%] bg-transparent ">
        <p className="">{formData.hunuk}</p>
        <p className="">{formData.hunpi}</p>
      </div>

      {/* pan mun nei teng */}
      <div className="absolute text-[.54rem] w-24 text-left  text-black top-[30.4%] right-[16.5%] bg-transparent space-y-2">
        <p className="pt-[1px]">Worship Team</p>
        <p className="pt-[4px]">Worship Leader</p>
        {/* Lai Siangtho kamngah gen */}
        <p className="pt-[3px] text-wrap h-4">
          {formData.laiSiangthoKamngahGen}
        </p>
        {/* Lai Siangtho simkhopna */}
        <p className="pt-[7px]">{formData.laiSiangthoSimkhopna}</p>
        {/* Phatna la (Solo) */}
        <p className="pt-[9.5px]">{formData.phatnaLa}</p>
        {/* Sumpi apna */}
        <p className="pt-[4px]">{formData.sumpiApna}</p>
        {/* Duet */}
        <p className="pt-[3px]">{formData.duet}</p>
        {/* Ahuam thungetna */}
        <p className="pt-[2px]">{formData.ahuamThungetna}</p>
        {/* Group song */}
        <p className="pt-[2px]">{formData.groupSong}</p>
        {/* Hanthotna hun */}
        <p className="pt-[1px]">{formData.hunpi}</p>
        {/* Hnzawh Lungdamkohna */}
        <p className="pt-[1.5px]">{formData.tawpna}</p>
      </div>
    </div>
  );
}

export default ZoHunFormPage;
