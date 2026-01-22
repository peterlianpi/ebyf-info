"use client";

import React from "react";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import { User } from "@/types";
import EnhancedSearch from "@/components/ui/enhanced-search";

// Search function that filters local members by EBYF roles
const searchMembers = async (query: string): Promise<User[]> => {
  if (!query.trim()) return [];

  return await filterLocalMembersByRole({
    keywords: "EBYF",
    searchQuery: query,
  });
};

export default function SearchBox() {
  return (
    <EnhancedSearch
      title="Find Church Members"
      placeholder="Search by name, email, phone, or role..."
      searchFunction={searchMembers}
      debounceMs={500}
      maxResults={50}
      showResultsCount={true}
      emptyStateMessage="Start typing to find church members"
      errorMessage="Unable to search members. Please check your connection and try again."
      className="max-w-2xl mx-auto"
    />
  );
}
