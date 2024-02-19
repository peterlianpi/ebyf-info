import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
// next hooks
import { usePathname } from "next/navigation";

const Profile = () => {
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
      <nav className="flex items-center gap-4 font-semibold  ">
        {status === "authenticated" && (
          <div className="flex justify-center gap-x-2 h-[40px] mb-8 md:mb-0">
            <Button
              variant="outline"
              className="min-w-[100px] px-2 py-1 bg-gray-300 dark:bg-secondary h-full"
              asChild
            >
              <Link href={"/profile"} className="whitespace-nowrap">
                Hello, {userName}
              </Link>
            </Button>
            <Button
              asChild
              className="min-w-[100px]  px-2 py-1 h-full"
              onClick={() => signOut()}
            >
              <Link href={"/"}>Logout </Link>
            </Button>
          </div>
        )}
        {status !== "authenticated" && (
          <div className="flex justify-center gap-x-2 h-[40px] mb-8 md:mb-0">
            <Button
              variant="outline"
              className="min-w-[100px] px-2 py-1 bg-gray-300 dark:bg-secondary h-full"
              asChild
            >
              <Link href={"/login"}>Login</Link>
            </Button>
            <Button className="min-w-[100px]  px-2 py-1 h-full" asChild>
              <Link href={"/register"}>Register</Link>
            </Button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Profile;
