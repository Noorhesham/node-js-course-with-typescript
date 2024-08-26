"use client";
import React, { useRef, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
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

const PhoneNav = ({ navigation, isHome }: { navigation: any; isHome?: boolean }) => {
  const pathName = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations();
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
              {navigation.map((link: any, i: number) =>
                link.subLinks ? (
                  <Accordion key={i} className={`text-gray-50 z-[999] w-full ml-3`} type="single" collapsible>
                    <AccordionItem className="w-full" value={`item-${i}`}>
                      <AccordionTrigger>{t(`navbar.${link.text.toLowerCase()}`)}</AccordionTrigger>
                      <AccordionContent className="flex z-50 flex-col gap-2">
                        {link.subLinks.map((subLink: any, i: number) => (
                          <Link key={i} className="ml-3 py-2 px-3 text-nowrap" href={subLink.href || ""}>
                            {t(`navbar.${subLink.text.toLowerCase()}`)}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <motion.div key={i} variants={item} className="w-full">
                    <Link
                      href={link.href||""}
                      className={`text-balance my-2 z-50 w-full text-left text-gray-50 font-medium ${
                        pathName === link.url ? "text-main" : ""
                      }`}
                      onClick={() => {
                        setOpenNavigation(false);
                        enablePageScroll();
                      }}
                    >
                      {t(`navbar.${link.text.toLowerCase()}`)}
                    </Link>
                  </motion.div>
                )
              )}
            </MaxWidthWrapper>
          </motion.nav>
        )}
      </AnimatePresence>
      <button className="ml-auto z-50 right-2 fixed top-7 lg:hidden" onClick={toggleNavigation}>
        <MenuSvg isHome={isHome} openNavigation={openNavigation} />
      </button>
    </div>
  );
};

export default PhoneNav;

const MenuSvg = ({ openNavigation, isHome }: { openNavigation: any; isHome?: boolean }) => {
  return (
    <svg className="overflow-visible" width="20" height="12" viewBox="0 0 20 12">
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="20"
        height="2"
        rx="1"
        fill={isHome ? "#0D3B6F" : "#E6007E"}
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "10"}
        width="20"
        height="2"
        rx="1"
        fill={isHome ? "#0D3B6F" : "#E6007E"}
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};
