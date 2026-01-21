import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx as clsxOriginal } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsxOriginal(inputs))
}
