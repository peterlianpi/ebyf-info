import { getFromDB } from "@/utils/indexedDB";
import { decryptData } from "@/utils/crypto";
import { User } from "@/types";

export async function getAvailableYears(): Promise<number[]> {
  const encrypted = await getFromDB("users_all") as string | null;
  const allUsers: User[] = encrypted ? (decryptData(encrypted) as User[]) : [];

  const years = new Set<number>();
  allUsers.forEach(user => {
    user.roles?.forEach(role => {
      if (role.startedAt) {
        const year = new Date(role.startedAt).getFullYear();
        years.add(year);
      }
      if (role.endedAt) {
        const year = new Date(role.endedAt).getFullYear();
        years.add(year);
      }
    });
  });

  return Array.from(years).sort((a, b) => b - a); // latest first
}

export function getDefaultYear(years: number[]): number {
  return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
}