"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRODUCT_CATEGORIES } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "../hooks/useClickOutside";

const slideIn = {
  hidden: { x: "-100%" },
  visible: { x: "0%" },
  exit: { x: "-100%" },
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null); // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };
  useOnClickOutside(navRef, () => setIsOpen(false));
  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <div>
      {
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      }

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideIn}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="fixed inset-0  bg-opacity-50" />

            <div className="fixed  overflow-y-scroll h-full bg-gray-800 overscroll-y-none inset-0 z-40 flex">
              <motion.div
                className="w-4/5  " 
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideIn}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  ref={navRef}
                  className="relative flex w-full max-w-sm flex-col overflow-y-auto pb-12 shadow-xl"
                >
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-50"
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-2">
                    <ul>
                      {PRODUCT_CATEGORIES.map((category) => (
                        <li key={category.label} className="space-y-10 px-4 pb-8 pt-10">
                          <div className="border-b border-gray-200">
                            <div className="-mb-px flex">
                              <p className="border-transparent text-gray-100 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                                {category.label}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-sm">
                                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <Image
                                    fill
                                    src={item.imageSrc}
                                    alt="product category image"
                                    className="object-cover object-center"
                                  />
                                </div>
                                <Link href={item.href} className="mt-6 block font-medium text-gray-50">
                                  {item.name}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <Link
                        onClick={() => closeOnCurrent("/sign-in")}
                        href="/sign-in"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        onClick={() => closeOnCurrent("/sign-up")}
                        href="/sign-up"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
