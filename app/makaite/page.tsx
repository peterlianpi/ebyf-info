import { Suspense } from "react";
import { MakaiteYearWrapper } from "./_components/makaite-year-wrapper";

export default function MakaitePage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto space-y-2">
        <div className="h-16 bg-muted animate-pulse rounded" />
        <div className="space-y-2">
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
        </div>
      </div>
    }>
      <MakaiteYearWrapper />
    </Suspense>
  );
}
