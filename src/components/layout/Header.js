"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  

  return (
    <header className="flex items-center justify-between mb-4">
      <nav className="flex items-center ">
        <Link className="text-2xl font-semibold text-primary" href="/">
          EBYF Info
        </Link>
        <div className="hidden md:flex md:items-center md:gap-8 md:font-semibold md:text-gray-500 md:pl-16">
          <Link href={"/"}>Home</Link>
          <Link href={"/makaite"}>Makai 12</Link>
          <Link href={"/vengukte"}>Veng</Link>
          <Link href={"/library"}>Library</Link>
        </div>
      </nav>
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
    </header>
  );
}
