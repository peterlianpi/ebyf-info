"use client";

import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import Socials from "../Socials";
import SearchBox from "@/features/all-members/member-search";
import FeedbackForm from "@/features/feedback/components/feedback";

const Hero = () => {
  return (
    <section
      className="py-12 min-h-[70vh] md:h-[84vh] bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto">
        <div className="flex justify-center mb-8 xl:mb-0">
          <div className="flex max-w-2xl flex-col justify-center mx-auto text-center">
            <h1
              id="hero-title"
              className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]"
            >
              EBYF Contacts Info
            </h1>
            <p className="subtitle max-w-3xl mx-auto mb-6 text-base md:text-lg">
              EBYF Contacts Info: Easily connect with church youth. No more
              typing numbers—just tap and call.
            </p>
            <div className="mb-8" role="search" aria-label="Search for members">
              <SearchBox />
            </div>
            <div className="mb-8">
              <Socials
                containerStyles="flex gap-x-6 mx-auto justify-center"
                iconsStyles="text-foreground text-[22px] hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="text-center">
              <FeedbackForm />
            </div>
          </div>
        </div>

        <div className="hidden md:flex max-w-xl mt-12 justify-center items-center mx-auto">
          <RiArrowDownSLine
            className="text-3xl text-primary animate-bounce"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
