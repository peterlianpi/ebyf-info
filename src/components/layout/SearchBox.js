import React, { useState } from "react";

import UserItem from "@/components/UserItem";
import Remove from "../icons/Remove";
import Search from "../icons/Search";

export default function SearchBox({ users }) {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  // Function to filter users based on search query
  const filteredUsers = users.filter((user) => {
    return (
      searchQuery !== "" &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.veng.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Function to clear the search query
  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <>
      {/* Search input field */}
      <div className="flex items-center  relative h-14">
        <div className="absolute left-2">
          {searchQuery === "" && <Search />}
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="        Search by name or veng..."
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        {searchQuery !== "" && (
          <div className="absolute w-6 h-6 right-4 " onClick={clearSearchQuery}>
            <Remove />
          </div>
        )}
      </div>

      {filteredUsers.map((user) => (
        <div key={user._id} className="">
          {<UserItem user={user} />}
        </div>
      ))}
      <hr />
      {/* Rest of your rendering logic */}
    </>
  );
}
