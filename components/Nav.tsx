"use client";

// link (next js)
import Link from "next/link";
// next hooks
import { usePathname } from "next/navigation";
// framer motion
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAvailableYears } from "@/lib/years";
import { useYearParam } from "@/lib/useYearParam";

interface NavProps {
  containerStyles?: string;
  linkStyles?: string;
  underlineStyles?: string;
}

const links = [
  { path: "/", name: "Home" },
  { path: "/makaite", name: "Makai" },
  { path: "/vengukte", name: "Venguk" },
  { path: "/talen", name: "Talen" },
  { path: "/contacts", name: "Contacts" },
  // { path: "/hun-gelna", name: "Service" },
  { path: "/policy", name: "Policy" },
];

const yearBasedPaths = ["/makaite", "/vengukte", "/talen", "/contacts"];

const Nav = ({ containerStyles, linkStyles, underlineStyles }: NavProps) => {
  const path = usePathname();
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const { year } = useYearParam({ availableYears });

  useEffect(() => {
    getAvailableYears().then(setAvailableYears);
  }, []);

  return (
    <div className={`${containerStyles}`}>
      {links.map((link, index) => {
        const href = yearBasedPaths.includes(link.path) ? `${link.path}?year=${year}` : link.path;
        return (
          <Link
            key={index}
            href={href}
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
  );
};

export default Nav;
