"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "../constants";
import Button from "./Button";
import Cart from "./Cart";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const pathName = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setIsScrolled(true);  
      } else {
        setIsScrolled(false);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <nav
      className={`lg:flex hidden bg-white/50 px-16 py-5 border-b border-n-6  w-full fixed z-50 top-0 left-0 items-center justify-between transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-slate-800/50 bg-opacity-50 backdrop-blur-md" : ""
      }`}
    >
      <div className="flex items-center gap-5">
        <h3 className=" hidden lg:block">Logo</h3>
      </div>
      <ul className="hidden lg:flex gap-10 ml-20 items-center">
        {navigation.map((nav) => (
          <li
            className={`block relative text-sm lg:text-base uppercase transition-colors  hover:text-1 px-3 py-1 lg:-mr-0.25  ${
              nav.link === pathName ? " relative after:left-1/2 after:-translate-x-1/2 after:bg-1/80 text-1 after:w-2 after:h-2 after:rounded-full after:-bottom-1 after:absolute" : "text-gray-800 dark:text-gray-100"
            } `}
            key={nav.id}
          >
            <Link href={nav.link}>{nav.text}</Link>
          </li>
        ))}
      </ul>
      {
        <div className="flex gap-4 items-center">
          <Cart/>
          <Link href={"/signup"} className=" text-sm">
            Sign Up
          </Link>
          <Button link={"/signin"} className=" text-sm lg:text-base" text="Sign in" />
        
        </div>
      }
    </nav>
  );
};

export default NavBar;
