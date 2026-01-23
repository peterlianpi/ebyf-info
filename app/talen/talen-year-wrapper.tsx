"use client";

import { useEffect, useState } from "react";
import SearchBox from "@/features/talen/components/talen-search";
import { PageHeader } from "@/components/PageHeader";
import { YearSelector } from "@/components/YearSelector";
import { getAvailableYears } from "@/lib/years";
import { useYearParam } from "@/lib/useYearParam";

export function TalenYearWrapper() {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const { year, setYear, years } = useYearParam({ availableYears });

  useEffect(() => {
    getAvailableYears().then(setAvailableYears);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-2">
      <PageHeader
        title={`YF Talen ${year}`}
        description="Find YF Talen participants and check contributions"
        actions={<YearSelector years={years} value={year} onChange={setYear} />}
      />
      <SearchBox year={year} />
    </div>
  );
}