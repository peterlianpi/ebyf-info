import { Suspense } from "react";
import { MakaiteClient } from "./_components/makaite-client";

export default function MakaitePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col max-w-md gap-2 mx-auto">
        <div className="flex items-center justify-start">
          <p className="text-2xl mb-4 font-extrabold w-[80%]">Makai te</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
          <div className="w-full h-24 bg-muted animate-pulse rounded" />
        </div>
      </div>
    }>
      <MakaiteClient />
    </Suspense>
  );
}
