"use client";

import { useState, useEffect } from "react";
import UserItem from "@/components/user-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PeriodDisplay from "@/components/periodShow";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import { getFilterByTab } from "@/utils/roleFilters";
import { Users } from "lucide-react";
import { YearSelector } from "@/components/YearSelector";
import { getAvailableYears } from "@/lib/years";
import { useYearParam } from "@/lib/useYearParam";

import { User } from "@/types";

interface Tab {
  label: string;
}

const TABS: Tab[] = [
  { label: "Sisan" },
  { label: "Library" },
  { label: "Mopuan" },
];

export function ContactsYearWrapper() {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const { year, setYear, years } = useYearParam({ availableYears });
  const [users, setUsers] = useState<Record<string, User[]>>({});
  const [usersLoading, setUsersLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getAvailableYears().then(setAvailableYears);
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      for (const tab of TABS) {
        setUsersLoading(prev => ({ ...prev, [tab.label]: true }));
        const filters = getFilterByTab(tab.label);
        const result = await filterLocalMembersByRole({ ...filters, year });
        setUsers(prev => ({ ...prev, [tab.label]: result }));
        setUsersLoading(prev => ({ ...prev, [tab.label]: false }));
      }
    };

    fetchAllUsers();
  }, [year]);

  return (
    <div className="max-w-2xl mx-auto space-y-2">
      <PageHeader
        title="Contacts"
        description="Find and connect with church members"
        actions={<YearSelector years={years} value={year} onChange={setYear} />}
      />

      <Tabs defaultValue={TABS[0].label} className="w-full">
        <TabsList className="grid w-full mb-2 grid-cols-3 h-12">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.label}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.label} value={tab.label} className="space-y-4">
            {usersLoading[tab.label] ? (
              <div className="space-y-4">
                <Skeleton className="w-full h-24" />
                <Skeleton className="w-full h-24" />
                <Skeleton className="w-full h-24" />
              </div>
            ) : users[tab.label]?.length > 0 ? (
              <div className="space-y-4">
                {tab.label === "Library"
                  ? users[tab.label].map((user) => {
                      const filteredRoles = (user.roles || []).filter((role) =>
                        role.role.name.toLowerCase().includes("library"),
                      );

                      return filteredRoles.length > 0 ? (
                        <div key={user.id}>
                          <PeriodDisplay
                            startedAt={filteredRoles[0].startedAt}
                            endedAt={filteredRoles[0].endedAt}
                          />
                          <UserItem user={user} />
                        </div>
                      ) : null;
                    })
                  : users[tab.label].map((user) => (
                      <UserItem key={user.id} user={user} />
                    ))}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title={`No ${tab.label.toLowerCase()} contacts found`}
                description="There are no members in this category at the moment."
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}