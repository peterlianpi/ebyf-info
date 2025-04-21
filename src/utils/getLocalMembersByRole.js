import { filterLocalMembersByRole } from "./filterLocalMembersByRole";

/**
 * Simulates API route logic using local IndexedDB
 * @param {string} route - One of: "library", "mopuan", "makaite", "vengukte", "blood", "talen", "search"
 * @param {Object} query
 * @param {string} [query.searchQuery]
 * @param {string} [query.orgId]
 * @returns {Promise<{ members: any[], totalItems?: number, error?: string }>}
 */
export async function getLocalMembersByRoute(route, query = {}) {
  const { searchQuery } = query;
  console.log("Route :", route); // Log the route to debug
  console.log("Search query:", searchQuery); // Log the search query to debug

  try {
    let options = {};

    switch (route) {
      case "library":
        options.keywords = "Library";
        break;

      case "mopuan":
        options.keywords = "Mopuan";
        break;

      case "makaite":
        options.includedRoles = [
          "EBYF - President",
          "EBYF - Vice President",
          "EBYF - Secretary",
          "EBYF - Assistant Secretary",
          "EBYF - Treasurer",
          "EBYF - Accountant",
          "EBYF - Member",
        ];
        break;

      case "vengukte":
        options.keywords = "Veng Uk";
        break;

      case "blood":
        options.keywords = "Blood";
        break;

      case "talen":
        if (!searchQuery?.trim()) {
          return { members: [], totalItems: 0 };
        }
        options.searchQuery = searchQuery;
        options.includedRoles = ["EBYF - Talent Sum"];
        console.log("Options searchQuery: ", options.searchQuery); // Log the options to debug
        console.log("Options includedRoles: ", options.includedRoles); // Log the options to debug

        break;

      case "search":
        if (!searchQuery?.trim()) {
          return { members: [], totalItems: 0 };
        }
        options.searchQuery = searchQuery;
        options.keywords = "EBYF";
        break;

      default:
        return { members: [], error: "Invalid route name" };
    }

    // Pass options to your role filter logic
    const members = await filterLocalMembersByRole({
      includedRoles: options.includedRoles,
      excludedRoles: options.excludedRoles,
      keywords: options.keywords,
      searchQuery: options.searchQuery,
    });

    return {
      members,
      ...(["search", "talent"].includes(route)
        ? { totalItems: members.length }
        : {}),
    };
  } catch (err) {
    console.error("Local fetch error:", err);
    return { members: [], error: "Error fetching members from local storage" };
  }
}
