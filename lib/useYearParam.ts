"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { getDefaultYear } from './years';

export function useYearParam({ availableYears }: { availableYears: number[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const yearFromUrl = searchParams.get('year');
  const parsedYear = yearFromUrl ? parseInt(yearFromUrl) : null;
  const isValidYear = parsedYear !== null && availableYears.includes(parsedYear);
  const year = isValidYear ? parsedYear : getDefaultYear(availableYears);

  const setYear = (newYear: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('year', newYear.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { year, setYear, years: availableYears, isValidYear };
}