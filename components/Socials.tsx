import React from "react";
import {
  RiYoutubeFill,
  RiLinkedinFill,
  RiGithubFill,
  RiFacebookFill,
  RiInstagramFill,
} from "react-icons/ri";
import Link from "next/link";

interface SocialsProps {
  containerStyles?: string;
  iconsStyles?: string;
}

const icons = [
  {
    path: "https://www.youtube.com/@peterpausianlian",
    icon: <RiYoutubeFill />,
    label: "YouTube",
  },
  {
    path: "/",
    icon: <RiLinkedinFill />,
    label: "LinkedIn",
  },
  {
    path: "https://github.com/peterlianpi",
    icon: <RiGithubFill />,
    label: "GitHub",
  },
  {
    path: "https://facebook.com/p.lianpi",
    icon: <RiFacebookFill />,
    label: "Facebook",
  },
  {
    path: "https://instagram.com/peterpausianlian",
    icon: <RiInstagramFill />,
    label: "Instagram",
  },
];

const Socials = ({ containerStyles, iconsStyles }: SocialsProps) => {
  return (
    <>
      <span className="mb-4">Made with ❤ by Peter</span>
      <div className={`${containerStyles}`}>
        {icons.map((social, index) => (
          <Link
            key={index}
            href={social.path}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`${iconsStyles}`} aria-label={social.label}>
              {social.icon}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Socials;
