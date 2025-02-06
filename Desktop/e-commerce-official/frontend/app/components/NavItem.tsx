"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { PRODUCT_CATEGORIES } from "../constants";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ category, isAnyOpen, isOpen, handleOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <motion.div className="relative  flex items-center">
        <Button size={"sm"} variant={isOpen ? "secondary" : "ghost"} onClick={handleOpen} className="gap-1.5 text-sm">
          {category.label}
          <ChevronDown className={cn("h-4 w-4 transition-all text-muted-foreground", isOpen && "-rotate-180")} />
        </Button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4 }}
            className={cn("absolute inset-0 top-full text-sm text-muted-foreground", {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            })}
          >
            <div className="absolute inset-0 top-1/2  bg-black shadow" aria-hidden="true" />
            <div className="relative bg-black ">
              <div className="mx-auto max-w-7xl px-8">
                <div className="py-16">
                  <div className="grid grid-cols-4 gap-x-8 gap-y-10">
                    {category.featured.map((item) => (
                      <div key={item.name} className="group relative text-base sm:text-sm">
                        <div className="relative flex aspect-video items-center overflow-hidden rounded-lg bg-gray-100 duration-150 group-hover:opacity-75">
                          <Image fill src={item.imageSrc} alt={item.name} className="object-center object-contain" />
                        </div>
                        <Link
                          href={`/products?category=${category.value}`}
                          className="pointer-events-auto mt-6 block font-medium text-gray-50"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1" aria-hidden="true">
                          Shop now
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavItem;
