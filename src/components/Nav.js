// link (next js)
import Link from "next/link";
// next hooks
import { usePathname } from "next/navigation";
// framer motion
import { motion } from "framer-motion";

import { signOut, useSession } from "next-auth/react";

const links = [
  { path: "/", name: "Home" },
  { path: "/makaite", name: "Makai" },
  { path: "/vengukte", name: "Venguk" },
];
const Nav = ({ containerStyles, linkStyles, underlineStyles }) => {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  const path = usePathname();

  return (
    <div className={`${containerStyles}`}>
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
      <nav className="flex items-center gap-4 font-semibold text-gray-500">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"} className="whitespace-nowrap">
              Hello, {userName}
            </Link>
            <button
              onClick={() => signOut()}
              className="px-8 py-2 text-white rounded-full bg-primary"
            >
              Logout
            </button>
          </>
        )}
        {status !== "authenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className="px-8 py-2 text-white rounded-full bg-primary"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Nav;
