"use client";

import { useState, useEffect } from "react";
import UserItem from "@/components/user-item";
import { Skeleton } from "@/components/ui/skeleton";
import PeriodDisplay from "@/components/periodShow";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import { getFilterByTab } from "@/utils/roleFilters";
import { useUsers } from "@/hooks/useUsers";

const TABS = [{ label: "Sisan" }, { label: "Library" }, { label: "Mopuan" }];

export default function CombinedContactsPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [users, setUsers] = useState([]);
  const { usersLoading, setUsersLoading } = useUsers();

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      setUsersLoading(true);
      const filters = getFilterByTab(activeTab.label);
      const result = await filterLocalMembersByRole(filters);
      setUsers(result);
      setUsersLoading(false);
    };

    fetchFilteredUsers();
  }, [activeTab]);

  return (
    <div className="max-w-md mx-auto">
      {/* Tabs */}
      <div className="flex justify-center items-center gap-4 mb-4 border-b">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 ${
              activeTab.label === tab.label
                ? "border-b-2 border-blue-500 font-bold"
                : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {usersLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      ) : (
        <div>
          {activeTab.label === "Library"
            ? users.map((user) => {
                const filteredRoles = user.roles.filter((role) =>
                  role.role.name.toLowerCase().includes("library")
                );

                return filteredRoles.length > 0 ? (
                  <div key={user.id} className="my-2">
                    <PeriodDisplay
                      startedAt={filteredRoles[0].startedAt}
                      endedAt={filteredRoles[0].endedAt}
                    />
                    <UserItem user={user} />
                  </div>
                ) : null;
              })
            : users.map((user) => (
                <div key={user.id} className="my-2">
                  <UserItem user={user} />
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
