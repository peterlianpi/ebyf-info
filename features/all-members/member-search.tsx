"use client";

import React, { useState, useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Search from "@/components/icons/Search";
import Remove from "@/components/icons/Remove";
import UserItem from "@/components/user-item";
import { BounceLoader } from "react-spinners";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import { User } from "@/types";

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to hold search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(searchQuery); // Debounced state for search query
  const { usersLoading, setUsersLoading } = useUsers(""); // Use the debounced query
  const [users, setUsers] = useState<User[]>([]); // State to hold filtered users

  // Debounce input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000); // 1 second debounce
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch users using local filter function
  useEffect(() => {
    const fetchFilteredUsers = async () => {
      if (!debouncedSearchQuery.trim()) {
        setUsers([]); // If query is empty, clear the users
        return;
      }

      setUsersLoading(true);
      try {
        const members = await filterLocalMembersByRole({
          keywords: "EBYF",
          searchQuery: debouncedSearchQuery,
        });
        setUsers(members);
      } catch (error) {
        console.error("Error fetching users:", error); // Log any errors
      } finally {
        setUsersLoading(false);
      }
    };

    if (debouncedSearchQuery) {
      fetchFilteredUsers();
    } else {
      setUsers([]);
    }
  }, [debouncedSearchQuery]); // Trigger this effect when debouncedSearchQuery changes

  // Handle the search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      {/* Search Input Field */}
      <div className="relative flex justify-center items-center gap-2 border px-4 rounded-lg">
        <div className="">{searchQuery === "" && <Search />}</div>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search for your name..."
          className="w-full rounded-md border-none hover:border-none mt-2"
          disabled={usersLoading}
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
