"use client";
import React, { useRef, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const container = {
  hidden: { opacity: 1, scale: 0 },
  exit: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const PhoneNav = ({ navigation }: { navigation: any }) => {
  const pathName = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (openNavigation && window.innerWidth <= 1024 && ref.current && !ref.current.contains(e.target as Node)) {
      setOpenNavigation(false);
      enablePageScroll();
    }
  };

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  return (
    <div ref={ref} className="overflow-y-scroll">
      <AnimatePresence>
        {openNavigation && (
          <motion.nav
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-0 left-0 bg-black/40 backdrop-blur-lg bottom-0 right-0 z-50 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
            onClick={handleClickOutside}
          >
            <MaxWidthWrapper className="relative z-50 mt-20 my-auto h-full w-full flex flex-col items-center justify-start mx-auto lg:flex-row">
              {navigation.map((link: any, i: number) => (
                <motion.div key={i} variants={item} className="w-full">
                  <Link
                    href={link.href || ""}
                    className={`text-balance my-2 z-50 w-full text-left text-gray-50 font-medium ${
                      pathName === link.href ? "text-main" : ""
                    }`}
                    onClick={() => {
                      setOpenNavigation(false);
                      enablePageScroll();
                    }}
                  >
                    {link.text}
                  </Link>
                </motion.div>
              ))}
            </MaxWidthWrapper>
          </motion.nav>
        )}
      </AnimatePresence>
      <button className="ml-auto z-50 right-2 fixed top-7 lg:hidden" onClick={toggleNavigation}>
        <MenuSvg openNavigation={openNavigation} />
      </button>
    </div>
  );
};

export default PhoneNav;

const MenuSvg = ({ openNavigation }: { openNavigation: any }) => {
  return (
    <svg className="overflow-visible" width="20" height="12" viewBox="0 0 20 12">
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="20"
        height="2"
        rx="1"
        fill={"#E6007E"}
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "10"}
        width="20"
        height="2"
        rx="1"
        fill={"#E6007E"}
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};
