import { getFromDB } from "@/utils/indexedDB";
import { decryptData } from "@/utils/crypto";
import { User, FilterOptions } from "@/types";

/**
 * Filters locally stored users by role array and search parameters.
 * @param options - Filter options
 * @returns Promise of filtered user array
 */
export async function filterLocalMembersByRole(
  options: FilterOptions = {}
): Promise<User[]> {
  const { includedRoles = [], excludedRoles = [], keywords = "", searchQuery = "" } = options;

  const encrypted = await getFromDB("users_all") as string | null;
  const allUsers: User[] = encrypted ? (decryptData(encrypted) as User[]) : [];

  const normalizedIncluded = includedRoles.map((r: string) => r.toLowerCase());
  const normalizedExcluded = excludedRoles.map((r: string) => r.toLowerCase());
  const normalizedKeyword = keywords.toLowerCase();
  const normalizedSearch = searchQuery.toLowerCase();

  const filtered = allUsers.filter((user) => {
    const name = (user.name || "").toLowerCase();
    const phone = (user.phone || "").toLowerCase();
    const email = (user.email || "").toLowerCase();

    const roleNames = (user.roles || [])
      .map((r) => r.role?.name?.toLowerCase() || "");

    // ✅ Included roles
    if (
      normalizedIncluded.length > 0 &&
      !roleNames.some((r) => normalizedIncluded.includes(r))
    ) {
      return false;
    }

    // 🚫 Excluded roles
    if (
      normalizedExcluded.length > 0 &&
      roleNames.some((r) => normalizedExcluded.includes(r))
    ) {
      return false;
    }

    // 🔍 Keyword in roles
    if (
      normalizedKeyword &&
      !roleNames.some((r) => r.includes(normalizedKeyword))
    ) {
      return false;
    }

    // 🔎 Search query match in name, phone, email, or role
    if (
      normalizedSearch &&
      !(
        name.includes(normalizedSearch) ||
        phone.includes(normalizedSearch) ||
        email.includes(normalizedSearch) ||
        roleNames.some((r) => r.includes(normalizedSearch))
      )
    ) {
      return false;
    }

    return true;
  });

  return filtered;
}
