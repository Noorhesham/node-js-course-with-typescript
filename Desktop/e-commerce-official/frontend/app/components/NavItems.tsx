"use client";
import React, { useEffect, useRef, useState } from "react";
import { PRODUCT_CATEGORIES } from "../constants";
import NavItem from "./NavItem";
import { useOnClickOutside } from "../hooks/useClickOutside";

const NavItems = () => {
  const [active, setActive] = useState<null | number>(null);
  const isAnyOpen = active !== null;
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActive(null));
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  return (
    <div ref={navRef} className="flex gap-4  h-full">
      {PRODUCT_CATEGORIES.map((category, i) => {
        const isOpen = active === i;
        const handleOpen = () => {
          if (isOpen) setActive(null);
          else setActive(i);
        };
        return <NavItem key={i} category={category} isOpen={isOpen} isAnyOpen={isAnyOpen} handleOpen={handleOpen} />;
      })}
    </div>
  );
};

export default NavItems;
