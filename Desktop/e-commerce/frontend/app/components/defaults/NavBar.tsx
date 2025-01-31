import Link from "next/link";
import React from "react";
import PhoneNav from "./PhoneNav";
import Logo from "./Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ToggleDarkLight";
export const NAV_LINKS = [
  { text: "Home", link: "" },
  { text: "About", link: "about" },
  { text: "Projects", link: "projects" },
  { text: "Contact", link: "contact" },
  { text: "Services", link: "services" },
];
const NavBar = () => {
  return (
    <header>
      <nav className="fixed z-50  inset-0 !h-fit w-full ">
        <MaxWidthWrapper noPadding className="flex !pt-5 !h-fit justify-between">
          {" "}
          <div className=" ">
            <Logo />
          </div>
          <div className=" flex  items-center gap-5">
            <ul className="lg:flex  hidden items-center gap-4 ">
              {NAV_LINKS.map((link, i) => (
                <li key={i}>
                  <Link className=" hover:text-gray-50 duration-200 text-gray-100" href={`#${link.link}`}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <a href="/mohamed.pdf" download="Noor-Hesham-cv">
              <Button className=" text-sm">Download CV</Button>
            </a>
            <div className="  lg:hidden block">
              <PhoneNav />
            </div>
            {/*light and dark mode */}
            <ModeToggle />
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default NavBar;
