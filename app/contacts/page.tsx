import { Suspense } from "react";
import { ContactsYearWrapper } from "./contacts-year-wrapper";

export default function CombinedContactsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto space-y-2">
        <div className="h-16 bg-muted animate-pulse rounded" />
      </div>
    }>
      <ContactsYearWrapper />
    </Suspense>
  );
}
