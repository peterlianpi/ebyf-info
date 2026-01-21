"use client";

import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import Socials from "../Socials";
import SearchBox from "@/features/all-members/member-search";
import FeedbackForm from "@/features/feedback/components/feedback";

const Hero = () => {
  return (
    <section className="  py-12 h-[84vh] bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none">
      <div className="container mx-auto  ">
        <div className="flex justify-between gap-x-4 mb-8 xl:mb-0">
          <div className="flex max-w-md flex-col justify-center mx-auto text-center">
            <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">
              EBYF Contacts Info
            </div>
            <p className="subtitle max-w-[490px] mx-auto mb-4 ">
              EBYF Contacts Info: Easily connect with church youth. No more
              typing numbers—just tap and call.
            </p>
            <div className="mb-8">
              <SearchBox />
            </div>
            <Socials
              containerStyles="flex gap-x-6 mx-auto"
              iconsStyles="text-foreground text-[22px] hover:text-primary transition-all"
            />
          </div>
        </div>

        <div className="hidden md:flex max-w-xl mt-8 justify-center items-center mx-auto animate-bounce">
          <RiArrowDownSLine className="text-3xl text-primary" />
        </div>

        <div className="mb-20 text-center">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
