"use client";

import { useEffect, useState } from "react";
import { MakaiteClient } from "./makaite-client";
import { PageHeader } from "@/components/PageHeader";
import { YearSelector } from "@/components/YearSelector";
import { getAvailableYears } from "@/lib/years";
import { useYearParam } from "@/lib/useYearParam";

export function MakaiteYearWrapper() {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const { year, setYear, years } = useYearParam({ availableYears });

  useEffect(() => {
    getAvailableYears().then(setAvailableYears);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-2">
      <PageHeader
        title="Makai te"
        description="EBYF leadership and executive committee members"
        actions={<YearSelector years={years} value={year} onChange={setYear} />}
      />
      <MakaiteClient year={year} />
    </div>
  );
}
