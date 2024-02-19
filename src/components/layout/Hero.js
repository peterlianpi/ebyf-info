"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { RiArrowDownSLine } from "react-icons/ri";
import Socials from "../Socials";
import SearchBox from "./SearchBox";
import { useUsers } from "../useUsers";

// components

const Hero = () => {
  const { users, usersLoading, fetchUsers } = useUsers();

  // Ensure that this function is only executed in the client-side
  useEffect(() => {
    fetchUsers();
  }, []);

  if (usersLoading) {
    return "Loading user info...";
  }
  return (
    <section className="py-12   h-[84vh] xl:pt-28 bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none">
      <div className="container mx-auto">
        <div className="flex justify-between gap-x-4">
          {/* text */}
          <div className="flex max-w-md flex-col justify-center mx-auto  text-center  ">
            <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">
              EBYF Contacts Info
            </div>

            <p className="subtitle max-w-[490px] mx-auto xl:mx-0">
              EBYF Contacts Info: Easily connect with church youth. No more
              typing numbers—just tap and call.
            </p>

            <div className="mb-8">
              <SearchBox users={users} />
            </div>

            {/* socials */}
            <Socials
              containerStyles="flex gap-x-6 mx-auto xl:mx-0"
              iconsStyles="text-foreground text-[22px] hover:text-primary transition-all"
            />
          </div>
        </div>

        {/* icon */}
        <div className="hidden md:flex absolute left-2/4 bottom-44 xl:bottom-12 animate-bounce">
          <RiArrowDownSLine className="text-3xl text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
