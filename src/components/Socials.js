"use client";

import {
  RiYoutubeFill,
  RiLinkedinFill,
  RiGithubFill,
  RiFacebookFill,
  RiInstallFill,
  RiInstagramFill,
} from "react-icons/ri";
import Link from "next/link";

const icons = [
  {
    path: "https://www.youtube.com/@peterpausianlian",
    name: <RiYoutubeFill />,
  },
  {
    path: "/",
    name: <RiLinkedinFill />,
  },
  {
    path: "https://github.com/peterlianpi",
    name: <RiGithubFill />,
  },
  {
    path: "https://facebook.com/p.lianpi",
    name: <RiFacebookFill />,
  },
  {
    path: "https://facebook.com/peterpausianlian",
    name: <RiInstagramFill />,
  },
];

const Socials = ({ containerStyles, iconsStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        return (
          <Link key={index} href={icon.path} target="_blank">
            <div className={`${iconsStyles}`}>{icon.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
