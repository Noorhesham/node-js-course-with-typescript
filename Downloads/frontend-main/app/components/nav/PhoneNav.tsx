"use client";
import React, { useRef, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 1, scale: 0 },
  exit: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
      duration: 0.3,
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

const PhoneNav = ({ navigation, isHome }: { navigation: any; isHome?: boolean }) => {
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
  const locale = pathName?.split("/")[1];

  return (
    <div ref={ref} className="overflow-y-scroll">
      <AnimatePresence>
        {openNavigation && (
          <motion.nav
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${openNavigation ? "flex" : "hidden"} fixed top-0 left-0 bg-black/40 w-full h-screen
             backdrop-blur-lg bottom-0 right-0 z-[999] bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
            onClick={handleClickOutside}
          >
            <MaxWidthWrapper className="relative z-[999] mt-20 my-auto h-full w-full flex gap-5 flex-col items-center justify-start mx-auto lg:flex-row">
              {navigation.map((link: any, i: number) =>
                link.subLinks ? (
                  <Accordion key={i} className={`text-gray-50 z-[999] w-full ml-3`} type="single" collapsible>
                    <AccordionItem className="w-full" value={`item-${i}`}>
                      <AccordionTrigger>{link.text}</AccordionTrigger>
                      <AccordionContent className="flex z-50 flex-col gap-2">
                        {link.subLinks.map((subLink: any, i: number) => (
                          <Link key={i} className="ml-3 py-2 px-3 text-nowrap" href={subLink.href || ""}>
                            {subLink.text}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <motion.div key={i} variants={item} className="w-full">
                    <Link
                      href={link.href || ""}
                      className={`text-balance my-2 z-50 w-full text-left text-gray-50 font-medium ${
                        pathName === link.url ? "text-main" : ""
                      }`}
                      onClick={() => {
                        setOpenNavigation(false);
                        enablePageScroll();
                      }}
                    >
                      {link.text}
                    </Link>
                  </motion.div>
                )
              )}
            </MaxWidthWrapper>
          </motion.nav>
        )}
      </AnimatePresence>
      <button
        className={cn(
          " z-[999999] relative",
          openNavigation && locale === "en" ? " fixed right-2" : openNavigation && locale !== "ar" ? "fixed left-0" : ""
        )}
        onClick={toggleNavigation}
      >
        <MenuSvg isHome={isHome} openNavigation={openNavigation} />
      </button>
    </div>
  );
};

export default PhoneNav;

const MenuSvg = ({ openNavigation, isHome }: { openNavigation: any; isHome?: boolean }) => {
  return (
    <svg className="overflow-visible" width="20" height="14" viewBox="0 0 20 14">
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="20"
        height="2"
        rx="1"
        fill={"#3AC0E5"}
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className={`${openNavigation ? " opacity-0" : "transition-all opacity-100"} origin-center`}
        y={openNavigation ? "5" : "8"}
        width="20"
        height="2"
        rx="1"
        fill={"#3AC0E5"}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "16"}
        width="20"
        height="2"
        rx="1"
        fill={"#3AC0E5"}
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};
