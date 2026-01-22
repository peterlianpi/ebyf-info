import { Suspense } from "react";
import { MakaiteClient } from "./_components/makaite-client";
import { PageHeader } from "@/components/PageHeader";

export default function MakaitePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-2">
      <PageHeader
        title="Makai te"
        description="EBYF leadership and executive committee members"
      />
      <Suspense fallback={
        <div className="space-y-2">
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
        </div>
      }>
        <MakaiteClient />
      </Suspense>
    </div>
  );
}
