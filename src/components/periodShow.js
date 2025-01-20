import React from "react";

const PeriodDisplay = ({ startedAt, endedAt }) => {
  if (!startedAt || !endedAt) return <div>No Period Available</div>;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div>
      <p className="text-sm p-4">
        From : {formatDate(startedAt)} To : {formatDate(endedAt)}
      </p>
    </div>
  );
};

export default PeriodDisplay;
