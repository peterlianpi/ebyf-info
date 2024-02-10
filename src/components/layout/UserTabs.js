"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <>
      <div className="flex justify-center gap-2 mx-auto tabs items-center text-sm">
        <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
          Profile
        </Link>
        {isAdmin && (
          <>
            <Link
              className={path === "/categories" ? "active" : ""}
              href={"/categories"}
            >
              Categories
            </Link>
            <Link
              className={path === "/addusers" ? "active" : ""}
              href={"/addusers"}
            >
              Add Users
            </Link>
            <Link
              className={path.includes("/users") ? "active" : ""}
              href={"/users"}
            >
              Users
            </Link>
          </>
        )}
      </div>
    </>
  );
}
export default UserTabs;
