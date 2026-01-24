import { Suspense } from "react";
import { VengukteYearWrapper } from "./vengukte-year-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

function VenguktePage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto space-y-2">
        <div className="h-16 bg-muted animate-pulse rounded" />
        <div className="space-y-4">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      </div>
    }>
      <VengukteYearWrapper />
    </Suspense>
  );
}

export default VenguktePage;
