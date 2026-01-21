// link (next js)
import Link from "next/link";
// next hooks
import { usePathname } from "next/navigation";
// framer motion
import { motion } from "framer-motion";

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
const Nav = ({ containerStyles, linkStyles, underlineStyles }: NavProps) => {
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
    </div>
  );
};

export default Nav;
