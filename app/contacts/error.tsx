"use client";

import { ErrorState } from "@/components/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <ErrorState
        title="Failed to load contacts"
        message={error.message || "Something went wrong while loading the contacts."}
        retry={reset}
      />
    </div>
  );
}