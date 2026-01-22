
interface PeriodDisplayProps {
  startedAt?: string;
  endedAt?: string;
}

const PeriodDisplay = ({ startedAt, endedAt }: PeriodDisplayProps) => {
  if (!startedAt) return <div>No Period Available</div>;

  const startDate = new Date(startedAt);
  const endDate = endedAt ? new Date(endedAt) : null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  // Check if it's a one-year period (approximately)
  const isOneYearPeriod = () => {
    if (!endDate) return false;
    const yearDiff = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();
    return yearDiff === 1 || (yearDiff === 0 && monthDiff >= 11); // Allow for Dec to Jan
  };

  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const startYear = startDate.getFullYear();
    let effectiveEndDate = endDate;

    // Auto-calculate end date if none provided
    if (!endDate) {
      // If started this year or last year, assume it ends December of start year
      if (startYear >= currentYear - 1) {
        effectiveEndDate = new Date(startYear, 11, 31); // December 31st of start year
      } else {
        // For older years, show as "Year-Present"
        return `${startYear}-Present`;
      }
    }

    const endYear = effectiveEndDate!.getFullYear();

    // If it's approximately a year period, show just the year
    if (isOneYearPeriod() || (!endDate && effectiveEndDate)) {
      return `${startYear}`;
    }

    // For other periods, show full dates
    return `${formatDate(startedAt)} - ${effectiveEndDate ? formatDate(effectiveEndDate.toISOString()) : "Present"}`;
  };

  return (
    <div>
      <p className="text-xs p-4">
        {getYearRange()}
      </p>
    </div>
  );
};

export default PeriodDisplay;
