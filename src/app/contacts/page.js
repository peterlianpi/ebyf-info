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
              {activeTab.label === "Library" ? (
                users.map((user) => {
                  // Filter roles: only keep those that include 'Library'
                  const filteredRoles = user.roles.filter((role) =>
                    role.role.name.includes("Library")
                  );

                  // Only render UserItem if there are valid filtered roles
                  return filteredRoles.length > 0 ? (
                    <div key={user.id} className="my-2">
                      <div>
                        <PeriodDisplay
                          startedAt={filteredRoles[0].startedAt}
                          endedAt={filteredRoles[0].endedAt}
                        />
                      </div>
                      <UserItem user={user} />
                    </div>
                  ) : null; // Don't render if no valid roles
                })
              ) : (
                <div key={user.id} className="my-2">
                  <UserItem user={user} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CombinedContactsPage;
