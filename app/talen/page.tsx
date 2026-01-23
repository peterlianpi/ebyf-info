import { Suspense } from "react";
import { TalenYearWrapper } from "./talen-year-wrapper";

const TalentPage = () => {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="h-16 bg-muted animate-pulse rounded" />
        </div>
      }
    >
      <TalenYearWrapper />
    </Suspense>
  );
};

export default TalentPage;
