"use client";

import React from "react";
import { useUsersQuery } from "@/hooks/use-users-query";
import { User } from "@/types";
import EnhancedSearch from "@/components/ui/enhanced-search";

export default function SearchBox() {
  const { users: allUsers, isLoading: usersLoading, isError: usersError } = useUsersQuery();

  // Search function that filters users from React Query cache
  const searchMembers = async (query: string): Promise<User[]> => {
    if (!query.trim()) return [];

    const lowercaseQuery = query.toLowerCase();
    return allUsers.filter(user =>
      user.name?.toLowerCase().includes(lowercaseQuery) ||
      user.email?.toLowerCase().includes(lowercaseQuery) ||
      user.phone?.toLowerCase().includes(lowercaseQuery) ||
      user.roles?.some(role => role.role.name.toLowerCase().includes(lowercaseQuery))
    );
  };

  if (usersLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading member data...</p>
        </div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-8">
          <p className="text-destructive">Failed to load member data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <EnhancedSearch
      title="Find Church Members"
      placeholder="Search by name, email, phone, or role..."
      searchFunction={searchMembers}
      debounceMs={500}
      maxResults={50}
      showResultsCount={true}
      emptyStateMessage="Start typing to find church members"
      errorMessage="Unable to search members. Please try again."
      className="max-w-2xl mx-auto"
    />
  );
}
