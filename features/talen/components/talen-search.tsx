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
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold font-sans text-primary">
          YF Talen 2025
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Each home selects <strong>two members</strong> for{" "}
          <strong>YF Talen 2025</strong>, with contributions collected{" "}
          <strong>quarterly</strong>. Search below to see if you&apos;re on the
          list.
        </p>
      </div>

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
    </div>
  );
}
