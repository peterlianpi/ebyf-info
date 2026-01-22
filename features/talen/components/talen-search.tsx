"use client";

import React from "react";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import { User } from "@/types";
import EnhancedSearch from "@/components/ui/enhanced-search";

// Search function that filters talent members
const searchTalentMembers = async (query: string): Promise<User[]> => {
  if (!query.trim()) return [];

  return await filterLocalMembersByRole({
    includedRoles: ["EBYF - Talent Sum"],
    searchQuery: query,
  });
};

export default function SearchBox() {
  return (
    <EnhancedSearch
      title="Find Talent Members"
      placeholder="Search by name to check talent participation..."
      searchFunction={searchTalentMembers}
      debounceMs={800}
      maxResults={100}
      showResultsCount={true}
      emptyStateMessage="Enter a name to check YF Talen 2025 participation"
      errorMessage="Unable to search talent members. Please try again."
      className="max-w-2xl mx-auto"
    />
  );
}
