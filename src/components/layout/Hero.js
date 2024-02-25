"use client";

import React, { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import Socials from "../Socials";
import SearchBox from "./SearchBox";
import { useUsers } from "../useUsers";
import Loading from "../icons/Loading";
import FeedbackForm from "./FeedbackForm";
import Close from "../icons/Close";
import UserListPage from "@/app/UserList/page";

const Hero = () => {
  const { users, usersLoading, fetchUsers } = useUsers();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFeedbackButtonClick = () => {
    setShowFeedbackForm(true);
  };

  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  if (usersLoading) {
    return (
      <div className="flex items-center text-center max-w-md mx-auto justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="  py-12 h-[90vh] bg-hero bg-no-repeat bg-bottom bg-cover dark:bg-none">
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
              <SearchBox users={users} />
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
          <button
            onClick={handleFeedbackButtonClick}
            className="bg-primary text-primary-foreground py-3 px-6 rounded-md shadow-md hover:bg-primary-dark transition-all"
          >
            Provide Feedback
          </button>
        </div>

        {showFeedbackForm && (
          <div className="max-full mx-auto fixed top-0 left-0 right-0  h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-primary-foreground p-8 rounded-md relative">
              <button
                className="absolute top-2 right-2 w-10 h-10"
                onClick={handleCloseFeedbackForm}
              >
                <Close />
              </button>
              <FeedbackForm />
            </div>
          </div>
        )}
      </div>
      <UserListPage />
    </section>
  );
};

export default Hero;
