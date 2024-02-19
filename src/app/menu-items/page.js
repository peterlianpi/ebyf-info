"use client";
import { useProfile } from "@/components/UseProfile";
import Loading from "@/components/icons/Loading";
import UserTabs from "@/components/layout/UserTabs";

function MenuItemsPage() {
  const { loading, data } = useProfile();
  if (loading) {
    return (
      <div className="flex items-center text-center max-w-md mx-auto justify-center">
        <Loading />
      </div>
    );
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
