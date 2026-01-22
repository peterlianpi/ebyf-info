"use client";

import { useState, useEffect } from "react";

// components
import ThemeToggler from "../ThemeToggler";
import Logo from "../Logo";
import Nav from "../Nav";
import MobileNav from "../MobileNav";
import { usePathname } from "next/navigation";

const Header = () => {
  const [header, setHeader] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // remove event
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        header
          ? "py-4 bg-secondary shadow-lg"
          : "py-6 dark:bg-transparent "
      } sticky top-2 z-30 transition-all ${pathname === "/" && "shadow-lg"}`}
    >
      <div className="container mx-auto px-4 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-x-6">
            {/* nav */}
            <Nav
              containerStyles="hidden xl:flex gap-x-4 items-center"
              linkStyles="relative hover:text-primary transition-all"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
            />
            <ThemeToggler />

            {/* mobile nav */}
            <div className="xl:hidden ">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
