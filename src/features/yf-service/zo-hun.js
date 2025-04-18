import React from "react";

const ZoHunSVG = ({
  date,
  hunuk,
  hunpi,
  laiSiangthoKamngahGen,
  laiSiangthoSimkhopna,
  phatnaLa,
  sumpiApna,
  duet,
  ahuamThungetna,
  groupSong,
  tawpna,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="255"
      height="352.753"
      viewBox="0 0 255 352.753"
    >
      {/* Example static image */}
      <image href="/zo-hun.png" width="240" height="339.463" x="8" y="6" />

      {/* Dynamic Date */}
      <text x="163" y="230" fontSize="8" fontFamily="CMGSans-Medium">
        {date}
      </text>

      {/* Example dynamic content */}
      <text x="165" y="390" fontSize="11" fontFamily="MonotypeCorsiva">
        {hunuk}
      </text>
      <text x="165" y="400" fontSize="11" fontFamily="MonotypeCorsiva">
        {hunpi}
      </text>
      <text x="140" y="558" fontSize="11" fontFamily="MonotypeCorsiva">
        {laiSiangthoKamngahGen}
      </text>
      <text x="140" y="592" fontSize="11" fontFamily="MonotypeCorsiva">
        {laiSiangthoSimkhopna}
      </text>
      <text x="140" y="617" fontSize="11" fontFamily="MonotypeCorsiva">
        {phatnaLa}
      </text>
      <text x="140" y="636" fontSize="11" fontFamily="MonotypeCorsiva">
        {sumpiApna}
      </text>
      <text x="140" y="656" fontSize="11" fontFamily="MonotypeCorsiva">
        {duet}
      </text>
      <text x="140" y="676" fontSize="11" fontFamily="MonotypeCorsiva">
        {ahuamThungetna}
      </text>
      <text x="140" y="695" fontSize="11" fontFamily="MonotypeCorsiva">
        {groupSong}
      </text>
      <text x="140" y="731" fontSize="11" fontFamily="MonotypeCorsiva">
        {tawpna}
      </text>
    </svg>
  );
};

export default ZoHunSVG;
