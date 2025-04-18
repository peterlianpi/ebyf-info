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
    <div className="relative w-[255px] h-[352.753px] mx-auto flex items-center justify-center">
      {/* Image */}
      <img
        className="relative w-[240px] h-[339.463px] rounded-lg"
        src="/zo-hun.png" // Image stored in the public folder
        alt="Service Program"
      />

      {/* Date positioned over image */}
      <p className="absolute text-[11px] font-serif text-black top-[13.5%] right-[4%] bg-transparent">
        {currentDate}
      </p>

      {/* Hunuk leh Hunpi */}
      <div className="absolute text-[11px] font-serif text-black top-[19.1%] right-[26.5%] bg-transparent">
        <p>{formData.hunuk}</p>
        <p>{formData.hunpi}</p>
      </div>

      {/* Worship Team and other information */}
      <div className="absolute text-[8px] font-sans text-black top-[30.4%] right-[16.5%] bg-transparent space-y-1">
        <p>Worship Team</p>
        <p>Worship Leader</p>
        <p>{formData.laiSiangthoKamngahGen}</p>
        <p>{formData.laiSiangthoSimkhopna}</p>
        <p>{formData.phatnaLa}</p>
        <p>{formData.sumpiApna}</p>
        <p>{formData.duet}</p>
        <p>{formData.ahuamThungetna}</p>
        <p>{formData.groupSong}</p>
        <p>{formData.hunpi}</p>
        <p>{formData.tawpna}</p>
      </div>

      {/* Contact Information */}
      <div className="absolute text-[6.5px] font-Century text-black top-[65%] right-[10%] bg-transparent">
        <p>Ph. 09 - 796 927 334</p>
        <p>{formData.date}</p>
      </div>

      {/* Additional info */}
      <div className="absolute text-[8px] font-sans text-black top-[70%] right-[12%] bg-transparent">
        <p>2:00 PM</p>
        <p>{formatDate(formData?.date || new Date())}</p>
      </div>
    </div>
  );
}

export default ZoHunFormPage;
