"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import Socials from "../Socials";
import SearchBox from "@/features/all-members/member-search";
import FeedbackForm from "@/features/feedback/components/feedback";
import { APP_DEFAULT_TITLE, APP_DESCRIPTION } from "@/site/site-config";

const Hero = () => {
  return (
    <section
      className="py-12 min-h-[70vh] md:h-[84vh] bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8 xl:mb-0">
          <div className="flex max-w-2xl flex-col justify-center mx-auto text-center space-y-6">
            <div>
              <h1
                id="hero-title"
                className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]"
              >
                {APP_DEFAULT_TITLE}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                {APP_DESCRIPTION}
              </p>
            </div>

            <div role="search" aria-label="Search for members">
              <SearchBox />
            </div>

            <Socials
              containerStyles="flex gap-x-6 mx-auto justify-center"
              iconsStyles="text-foreground text-[22px] hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <FeedbackForm />
          </div>
        </div>

        <div className="hidden md:flex max-w-xl mt-12 justify-center items-center mx-auto">
          <ChevronDown
            className="text-3xl text-primary animate-bounce"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
