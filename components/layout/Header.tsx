"use client";

import { useState, useEffect } from "react";

// components
import ThemeToggler from "../ThemeToggler";
import Logo from "../Logo";
import Nav from "../Nav";
import MobileNav from "../MobileNav";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

const Header = () => {
  const [header, setHeader] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).scrollY > 50) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    };
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).addEventListener("scroll", handleScroll);
      // remove event
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return () => (window as any).removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <header
      className={`${
        header ? "py-6 bg-muted shadow-lg" : "py-6"
      } sticky rounded-lg top-2 shadow-lg z-30 transition-all ${pathname === "/" && " bg-background"}`}
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
