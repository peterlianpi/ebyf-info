"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// framer motion
import { motion } from "framer-motion";

import { signOut, useSession } from "next-auth/react";

const links = [
  { path: "/profile", name: "Profile" },
  { path: "/addusers", name: "Add Users" },
  { path: "/users", name: "Users" },
];

function UserTabs({ isAdmin }) {
  const containerStyles = "hidden xl:flex gap-x-8 items-center";
  const linkStyles = "relative hover:text-primary transition-all";
  const underlineStyles = "absolute left-0 top-full h-[2px] bg-primary w-full";

  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  const path = usePathname();
  return (
    <>
      <div className="flex justify-center gap-2 mx-auto tabs items-center text-sm">
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.path}
              className={`capitalize ${linkStyles}`}
            >
              {link.path === path && (
                <motion.span
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  transition={{ type: "tween" }}
                  layoutId="underline"
                  className={`${underlineStyles}`}
                />
              )}
              {link.name}
            </Link>
          );
        })}
      </div>
    </>
  );
}
export default UserTabs;
