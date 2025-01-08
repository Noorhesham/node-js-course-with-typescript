import Image from "next/image";
import Link from "next/link";
import React from "react";
import PhoneNav from "./PhoneNav";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import RightMindLogo from "./RightMindLogo";
export const NAV_LINKS = ["HOME", "about us", "Projects", "Media center", "News", "Contact us"];
const NavBar = () => {
  return (
    <header>
      <nav className="fixed z-50  inset-0 !h-fit w-full ">
        <MaxWidthWrapper className="flex !h-fit justify-between">
          {" "}
          <PhoneNav />
          <div className=" md:block hidden">
            <RightMindLogo />
          </div>
          <div className=" md:block hidden">
            <ul className="flex text-base text-nowrap uppercase font-normal items-center gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <Link href="/">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default NavBar;
