"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import NavLink from "./NavLink";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import { usePathname, useRouter } from "next/navigation";
import PhoneNav from "./PhoneNav";
import MotionItem from "../defaults/MotionItem";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Language from "../Language";

const NavBar = () => {
  const t = useTranslations();
  const links = [
    {
      text: t("nav.home"),
      href: "/",
    },
    {
      text: t("nav.courses"),
      href: "/courses",
    },

    {
      text: t("nav.aboutus"),

      href: "/aboutus",
    },
    {
      text: t("nav.contactus"),
      href: "/contactus",
    },
  ];
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [active, setIsActive] = useState(false);
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopPage, setIsTopPage] = useState(true);
  const pathName = usePathname();
  const user = false;
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
  const isHome = pathName === "/en"||pathName === "/ar";
  return (
    <header className=" w-full">
      <nav
        className={`${
          isHome
            ? "text-gray-900 font-semibold placeholder:text-gray-800 "
            : `    font-semibold placeholder:text-gray-800"  ${isScrollingDown && "bg-white/80"}`
        } fixed inset-0 z-50 max-h-[5rem] lg:max-h-[7rem]  bg-white  flex flex-col gap-2  py-4 transition-all duration-300 ${
          isScrollingDown
            ? "translate-y-[-110%]"
            : !isTopPage && !isScrollingDown
            ? `  -translate-y-2 lg:-translate-y-5 ${!isHome && "bg-white/80"}`
            : "translate-y-0"
        }`}
      >
        {" "}
        <AnimatePresence>
          {(isHome || pathName.includes("aboutus")) && !isTopPage && !isScrollingDown && (
            <MotionItem
              nohover
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 h-[20rem] bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-10"
            >
              {null}
            </MotionItem>
          )}
        </AnimatePresence>
        <MaxWidthWrapper noPadding>
          <div
            className={cn(
              "flex relative z-20 items-center   ",
              !isTopPage && !isScrollingDown ? "justify-center lg:justify-between" : "justify-between"
            )}
          >
            <div
              className={`${!isTopPage && "lg:opacity-100  hidden lg:flex  opacity-0"} flex duration-150  items-center`}
            >
              <Logo isdark={isHome ? false : true} />
            </div>
            <div className="flex  items-center  gap-20 ">
              <ul className=" hidden lg:flex z-30 relative items-center  gap-4 xl:gap-8 ">
                {links.map((link) => (
                  //@ts-ignore
                  <NavLink isHome={isHome} key={link.text} href={link.href} text={link.text} subLinks={link.subLinks} />
                ))}
              </ul>
            </div>
            <div className="  flex items-center gap-2 ">
              <div className={`z-[999] duration-150 h-full  relative lg:hidden block`}>
                <PhoneNav isHome={isHome} navigation={links} />
              </div>
              <Language />
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default NavBar;
