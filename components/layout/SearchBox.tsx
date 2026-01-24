"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import UserItem from "../user-item";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  users: User[];
  isFetchingComplete: boolean;
}

export default function SearchBox({ users, isFetchingComplete }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to hold search query

  // Function to filter users based on search query
  const filteredUsers =
    isFetchingComplete && searchQuery !== ""
      ? users.filter((user) => {
          return (
            user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user?.veng && (typeof user.veng === 'string' ? user.veng.toLowerCase().includes(searchQuery.toLowerCase()) : user.veng.name?.toLowerCase().includes(searchQuery.toLowerCase())))
          );
        })
      : [];

  // Function to handle input change
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  // Function to clear the search query
  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={
            isFetchingComplete
              ? "Search by name or veng..."
              : "Loading users..."
          }
          disabled={!isFetchingComplete}
          className="pl-9 pr-9"
        />
        {searchQuery !== "" && isFetchingComplete && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-7 w-7 p-0"
            onClick={clearSearchQuery}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2">
        {filteredUsers.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
