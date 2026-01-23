"use client";

import { Skeleton } from "@/components/ui/skeleton";
import UserItem from "@/components/user-item";
import { filterLocalMembersByRole } from "@/utils/filterLocalMembersByRole";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { PageHeader } from "@/components/PageHeader";
import { YearSelector } from "@/components/YearSelector";
import { getAvailableYears } from "@/lib/years";
import { useYearParam } from "@/lib/useYearParam";

export function VengukteYearWrapper() {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const { year, setYear, years } = useYearParam({ availableYears });
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);

  useEffect(() => {
    getAvailableYears().then(setAvailableYears);
  }, []);

  useEffect(() => {
    const fetchAndFilterUsers = async () => {
      setUsersLoading(true);
      const users = await filterLocalMembersByRole({
        keywords: "Veng Uk",
        year,
      });

      const sorted = users.sort((a, b) => (a.number || 0) - (b.number || 0));
      setFilteredUsers(sorted);
      setUsersLoading(false);
    };

    fetchAndFilterUsers();
  }, [year]);

  return (
    <div className="max-w-2xl mx-auto space-y-2">
      <PageHeader
        title="Veng-Uk te"
        description="Veng Uk division members"
        actions={<YearSelector years={years} value={year} onChange={setYear} />}
      />

      {usersLoading ? (
        <div className="space-y-4">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}