"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Search from "@/components/icons/Search";
import Remove from "@/components/icons/Remove";
import UserItem from "@/components/user-item";
import { BounceLoader } from "react-spinners";
import { useUsers } from "@/hooks/useUsers";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

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
          includedRoles: ["EBYF - Talent Sum"],
          searchQuery: debouncedSearchQuery,
        });
        console.log("Search query:", debouncedSearchQuery); // Log the search query to debug
        console.log("Filtered users:", members); // Log the fetched members to debug
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

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const clearSearchQuery = () => {
    setSearchQuery(""); // Clear search query when user presses remove button
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold font-sans text-primary">
          YF Talen 2025
        </h1>
        <h3 className="mt-2 text-sm text-gray-500">
          Each home selects <strong>two members</strong> for{" "}
          <strong>YF Talen 2025</strong>, with contributions collected{" "}
          <strong>quarterly</strong>. Search below to see if you&apos;re on the
          list.
        </h3>
      </div>

      <div className="relative flex justify-center items-center gap-2 border px-4 rounded-lg">
        <div>{searchQuery === "" && <Search />}</div>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search Your Name..."
          className="w-full rounded-md border-none hover:border-none mt-2"
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

      {usersLoading && (
        <div className="flex justify-center py-4">
          <BounceLoader color="green" />
        </div>
      )}

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
