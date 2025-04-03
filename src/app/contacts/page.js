"use client";

import { useState, useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import UserItem from "@/components/user-item";
import { Skeleton } from "@/components/ui/skeleton";
import PeriodDisplay from "@/components/periodShow";

const TABS = [
  { label: "Sisan", route: "/blood?orgId=1" },
  { label: "Library", route: "/library?orgId=1" },
  { label: "Mopuan", route: "/mopuan?orgId=1" },
];

function CombinedContactsPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]); // Default to Blood tab
  const { users, usersLoading, fetchUsers } = useUsers(activeTab.route);

  useEffect(() => {
    fetchUsers();
  }, [activeTab]); // Fetch users when tab changes

  return (
    <div className="max-w-md mx-auto">
      {/* Tab Navigation */}
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
          {users.map((user) => (
            <div key={user.id} className="mb-2">
              {/* Conditionally render PeriodDisplay only for Library */}
              {activeTab.label === "Library" &&
                user.roles.some((role) =>
                  role.role.name.includes("Library")
                ) && (
                  <PeriodDisplay
                    startedAt={user.roles[0].startedAt}
                    endedAt={user.roles[0].endedAt}
                  />
                )}
              <UserItem user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CombinedContactsPage;
