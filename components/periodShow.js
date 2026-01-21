import React from "react";

const PeriodDisplay = ({ startedAt, endedAt }) => {
  if (!startedAt) return <div>No Period Available</div>;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div>
      <p className="text-xs p-4">
        From : {formatDate(startedAt)} To :{" "}
        {endedAt ? formatDate(endedAt) : "Present"}
      </p>
    </div>
  );
};

export default PeriodDisplay;
