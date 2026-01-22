"use client";

import { formatDateRange } from "@/lib/utils";

export default function HelloWorldPage() {
  const testCases = [
    {
      name: "Current year - no end date",
      start: new Date("2024-03-15"),
      end: undefined,
      expected: "Mar 15, 2024 - Dec 31, 2024",
    },
    {
      name: "Past year - with end date",
      start: new Date("2025-01-15"),
      end: new Date("2025-12-31"),
      expected: "Jan 15, 2025 - Dec 31, 2025",
    },
    {
      name: "Future year - no end date",
      start: new Date("2027-06-20"),
      end: undefined,
      expected: "Jun 20, 2027 - Dec 31, 2027",
    },
    {
      name: "Multi-year range",
      start: new Date("2023-09-10"),
      end: new Date("2024-12-31"),
      expected: "Sep 10, 2023 - Dec 31, 2024",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Date Range Formatter Test</h1>

      <div className="space-y-4">
        {testCases.map((testCase, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">{testCase.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Input: {testCase.start.toISOString().split('T')[0]}
              {testCase.end && ` to ${testCase.end.toISOString().split('T')[0]}`}
            </p>
            <p className="text-sm font-mono bg-muted p-2 rounded">
              Output: {formatDateRange(testCase.start, testCase.end)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
