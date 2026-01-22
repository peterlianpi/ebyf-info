import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date range string based on the provided start date and optional end date.
 * Handles various scenarios including current year, past years, and leap years.
 * Uses the actual start date instead of assuming January 1st.
 *
 * @param startDate - The start date of the range
 * @param endDate - Optional end date. If not provided, uses current date or "Present"
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: Date, endDate?: Date): string {
  const currentDate = new Date();
  const startYear = startDate.getFullYear();

  // Format date helper
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // If no end date provided, always use end of year
  if (!endDate) {
    const endOfYear = new Date(startYear, 11, 31);
    return `${formatDate(startDate)} - ${formatDate(endOfYear)}`;
  }

  // If end date is provided
  const endYear = endDate.getFullYear();

  if (startYear === endYear) {
    if (startYear === currentDate.getFullYear() &&
        endDate.getTime() >= currentDate.getTime()) {
      // Current year with end date in future: "Mar 15, 2024 - Present"
      return `${formatDate(startDate)} - Present`;
    } else {
      // Same year: "Mar 15, 2023 - Dec 31, 2023"
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
  } else {
    // Multi-year range: "Mar 15, 2023 - Dec 31, 2024"
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }
}

/**
 * Creates a year range string from start and end years.
 * @param startYear - Starting year
 * @param endYear - Ending year (optional, defaults to current year)
 * @returns Year range string like "2023-2024" or "2024-Present"
 */
export function formatYearRange(startYear: number, endYear?: number): string {
  const currentYear = new Date().getFullYear();

  if (!endYear || endYear >= currentYear) {
    return startYear === currentYear ? `${startYear}-Present` : `${startYear}-${currentYear}`;
  }

  return startYear === endYear ? `${startYear}` : `${startYear}-${endYear}`;
}

/**
 * Copies text to clipboard (client-side only).
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
