"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { JOB_LINKS } from "../constants";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { Server } from "../main/Server";

import { useAuth } from "../context/AuthContext";

import PhoneNav from "./PhoneNav";
import { Button } from "@/components/ui/button";
const links = [
  {
    text: "BROWSE A JOB",
    href: "/shop",
    subLinks: JOB_LINKS,
  },
  {
    text: "FOR EMPLOYERS",
  },
  {
    text: "POST JOB",
  },
  {
    text: "BLOG",
    href: "/about-us",
  },
];
const NavBar = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [active, setIsActive] = useState(false);
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopPage, setIsTopPage] = useState(true);
  const pathName = usePathname();
  const { userSettings, handleLogout, generalSettings } = useAuth();
  const user = userSettings;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setIsTopPage(true);
      } else setIsTopPage(false);
      if (window.scrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isTopPage]);
  const isHome = pathName === "/ar" || pathName === "/en" || pathName.includes("hospital");
  return (
    <header className=" w-full">
      <div className={`z-[999] duration-150 h-full top-0  fixed left-0  lg:hidden block`}>
        <PhoneNav isHome={isHome} navigation={links} />
      </div>
      <nav
        className={`${
          isHome
            ? "text-white placeholder:text-white "
            : `text-black placeholder:text-white ${!isScrollingDown && "bg-white/80"}`
        } fixed inset-0 z-50 max-h-[10rem]   flex flex-col gap-2  py-4 transition-all duration-300 ${
          isScrollingDown ? "-translate-y-full" : !isTopPage && !isScrollingDown ? "-translate-y-20" : "translate-y-0"
        }`}
      >
        <MaxWidthWrapper noPadding>
          <div className="flex items-center justify-between  ">
            <div className="flex  items-center  gap-20 ">
              <div className="flex items-center   ">
                <Logo isdark={isHome?false:true} />
              </div>
              <ul className=" hidden lg:flex z-30 relative items-center  gap-4 xl:gap-8 ">
                {links.map((link) => (
                  //@ts-ignore
                  <NavLink isHome={isHome} key={link.text} href={link.href} text={link.text} subLinks={link.subLinks} />
                ))}
              </ul>
            </div>
            <div className="  flex items-center gap-2 ">
              <Button
                className="  px-4 lg:px-8  rounded-t-full rounded-bl-sm rounded-br-sm rounded-l-full rounded-r-full"
                variant={"ghost"}
              >
                LOGIN
              </Button>
              <Button className="  px-4 lg:px-8 rounded-full">GET STARTED</Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default NavBar;
