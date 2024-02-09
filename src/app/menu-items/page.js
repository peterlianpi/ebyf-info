"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";

function MenuItemsPage() {
  const { loading, data } = useProfile();
  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={data.admin} />
      <div>MenuItemsPage</div>
    </section>
  );
}
export default MenuItemsPage;
