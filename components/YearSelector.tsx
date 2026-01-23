"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface YearSelectorProps {
  years: number[];
  value: number;
  onChange: (year: number) => void;
}

export function YearSelector({ years, value, onChange }: YearSelectorProps) {
  return (
    <Select value={value.toString()} onValueChange={(val) => onChange(parseInt(val))}>
      <SelectTrigger className="w-[120px]" aria-label="Select year">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}