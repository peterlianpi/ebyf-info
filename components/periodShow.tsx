
interface PeriodDisplayProps {
  startedAt?: string;
  endedAt?: string;
}

import { formatDateRange } from "@/lib/utils";

const PeriodDisplay = ({ startedAt, endedAt }: PeriodDisplayProps) => {
  if (!startedAt) return <div>No Period Available</div>;

  const startDate = new Date(startedAt);
  const endDate = endedAt ? new Date(endedAt) : undefined;

  return (
    <div>
      <p className="text-xs p-4">
        {formatDateRange(startDate, endDate)}
      </p>
    </div>
  );
};

export default PeriodDisplay;
