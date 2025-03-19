import React, { useState } from "react";
 
import Remove from "../icons/Remove";
import Search from "../icons/Search";
import UserItem from "../user-item";

export default function SearchBox({ users, isFetchingComplete }) {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  // Function to filter users based on search query
  const filteredUsers =
    isFetchingComplete && searchQuery !== ""
      ? users.filter((user) => {
          return (
            user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user?.veng?.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      : [];

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
          placeholder={
            isFetchingComplete
              ? "        Search by name or veng..."
              : "Loading users..."
          }
          disabled={!isFetchingComplete} // Disable input while fetching users
          className={`w-full border border-gray-300 rounded mt-2 ${
            isFetchingComplete ? "" : "bg-gray-100 cursor-not-allowed"
          }`}
        />
        {searchQuery !== "" && isFetchingComplete && (
          <div className="absolute w-6 h-6 right-4" onClick={clearSearchQuery}>
            <Remove />
          </div>
        )}
      </div>

      <div style={{ maxHeight: "250px", overflowY: "scroll" }}>
        {filteredUsers.map((user) => (
          <div key={user.id} className="">
            {<UserItem user={user} />}
          </div>
        ))}
      </div>
      <hr />
      {/* Rest of your rendering logic */}
    </>
  );
}
