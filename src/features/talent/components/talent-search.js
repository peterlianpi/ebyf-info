"use client";

import React, { useState, useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Search from "@/components/icons/Search";
import Remove from "@/components/icons/Remove";
import UserItem from "@/components/user-item";
import { BounceLoader } from "react-spinners";

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery); // Debounced state for search query
  const { users, usersLoading } = useUsers(
    `/talent?searchQuery=${debouncedSearchQuery}&orgId=1`
  ); // Use the debounced query

  // Handle the search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to clear the search query
  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  // Debounce the search query to reduce the number of API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000); // 1000ms debounce time

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold font-sans text-primary">
          YF Talent 2025
        </h1>
        <h3 className="mt-2 text-sm text-gray-500">
          Each home selects <strong>two members</strong> for <strong>YF Talent 2025</strong>, with contributions collected <strong>quarterly</strong>. Search below to see if you&apos;re on the list.
     </h3>
      </div>

      {/* Search Input Field */}
      <div className="relative flex justify-center items-center gap-2 border px-4 rounded-lg">
        <div className="">{searchQuery === "" && <Search />}</div>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search Your Name..."
          className="w-full rounded-md border-none hover:border-none mt-2"
          // disabled={usersLoading}
        />
        {searchQuery !== "" && !usersLoading && (
          <Button
            className="absolute w-10 h-10 right-5 p-2 rounded-full"
            variant="ghost"
            onClick={clearSearchQuery}
          >
            <Remove />
          </Button>
        )}
      </div>

      {/* Loading Spinner */}
      {usersLoading && (
        <div className="flex justify-center py-4">
          <BounceLoader color="green" />
        </div>
      )}

      {/* User Results or No Results */}
      <div
        style={{ maxHeight: "250px", overflowY: "scroll" }}
        className="space-y-2"
      >
        {users.length === 0 || usersLoading
          ? null
          : users.map((user) => <UserItem key={user.id} user={user} />)}
      </div>

      <hr className="my-4" />
    </div>
  );
}
