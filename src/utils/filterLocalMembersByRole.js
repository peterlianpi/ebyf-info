import { getFromDB } from "@/utils/indexedDB";
import { decryptData } from "@/utils/crypto";

/**
 * Filters locally stored users by role array and search parameters.
 * @param {string[]} [includedRoles] - roles to include
 * @param {string[]} [excludedRoles] - roles to exclude
 * @param {string} [keywords] - keyword to match in role
 * @param {string} [searchQuery] - general search for name/phone/email/roles
 * @returns {Promise<Object[]>}
 */
export async function filterLocalMembersByRole({
  includedRoles = [],
  excludedRoles = [],
  keywords = "",
  searchQuery = "",
} = {}) {
  const encrypted = await getFromDB("users_all");
  const allUsers = encrypted ? decryptData(encrypted) : [];

  const normalizedIncluded = includedRoles.map((r) => r.toLowerCase());
  const normalizedExcluded = excludedRoles.map((r) => r.toLowerCase());
  const normalizedKeyword = keywords.toLowerCase();
  const normalizedSearch = searchQuery.toLowerCase();

  const filtered = allUsers.filter((user) => {
    const name = (user.name || "").toLowerCase();
    const phone = (user.phone || "").toLowerCase();
    const email = (user.email || "").toLowerCase();

    const roleNames = (user.roles || [])
      // .filter((r) => !r.endedAt) // 🟢 Only active roles
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
