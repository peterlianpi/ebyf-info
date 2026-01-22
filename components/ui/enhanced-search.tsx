"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Users, Clock, AlertCircle } from "lucide-react";
import { User } from "@/types";
import SearchInput from "./search-input";
import UserList from "./user-list";
import LoadingState from "./loading-state";
import ErrorMessage from "./error-message";

interface EnhancedSearchProps {
  title?: string;
  placeholder?: string;
  searchFunction: (query: string) => Promise<User[]>;
  debounceMs?: number;
  maxResults?: number;
  showResultsCount?: boolean;
  className?: string;
  emptyStateMessage?: string;
  errorMessage?: string;
}

export default function EnhancedSearch({
  title = "Search Members",
  placeholder = "Search by name, email, or talent...",
  searchFunction,
  debounceMs = 500,
  maxResults = 50,
  showResultsCount = true,
  className = "",
  emptyStateMessage = "Start typing to search for members",
  errorMessage = "Failed to search. Please try again.",
}: EnhancedSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setError(null);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const searchResults = await searchFunction(debouncedQuery);
        const limitedResults = searchResults.slice(0, maxResults);
        setResults(limitedResults);
        setHasSearched(true);
      } catch (err) {
        console.error("Search failed:", err);
        setError(errorMessage);
        setResults([]);
        setHasSearched(true);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, searchFunction, maxResults, errorMessage]);

  const resultsCount = results.length;
  const hasMoreResults = results.length === maxResults;

  const displayResults = useMemo(() => {
    if (!hasSearched) return [];
    return results;
  }, [results, hasSearched]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Find and connect with church members quickly
        </p>
      </div>

      {/* Search Input */}
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={placeholder}
        disabled={isLoading}
        debounceMs={debounceMs}
        id="enhanced-search-input"
      />

      {/* Loading State */}
      {isLoading && (
        <LoadingState
          variant="skeleton"
          text="Searching..."
          className="py-8"
        />
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="text-center py-8">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Results Count */}
      {showResultsCount && hasSearched && !isLoading && !error && resultsCount > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>
              {resultsCount} {resultsCount === 1 ? "result" : "results"}
              {hasMoreResults && " (showing first 50)"}
            </span>
          </div>
          {debouncedQuery && (
            <div className="flex items-center gap-1 text-xs">
              <Clock className="w-3 h-3" />
              <span>Searched for &quot;{debouncedQuery}&quot;</span>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {!isLoading && hasSearched && !error && (
        <UserList
          users={displayResults}
          maxHeight="500px"
          emptyMessage={
            query.trim()
              ? `No members found matching "${query}"`
              : emptyStateMessage
          }
          className="border rounded-lg bg-card"
        />
      )}

      {/* Initial State */}
      {!hasSearched && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Ready to search</p>
          <p className="text-sm">{emptyStateMessage}</p>
        </div>
      )}

      {/* Performance Hint */}
      {hasSearched && resultsCount > 20 && (
        <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>Tip: Search results are limited for better performance</span>
        </div>
      )}
    </div>
  );
}