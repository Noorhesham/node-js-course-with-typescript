import HeaderPhone from "./HeaderPhone";
import DarkBtn from "./DarkBtn";
import { useEffect, useState } from "react";
import { useActive } from "../context/useActiveLink";
import { IoHomeOutline, IoPersonOutline, IoCodeWorking ,IoCallOutline } from "react-icons/io5";
import { CgCodeSlash } from "react-icons/cg";
import { LuPenLine } from "react-icons/lu";
import { motion } from "framer-motion";

function Header() {
  const { active } = useActive(); //this is used to determine the active link from the context

  const links = [
    { name: "home", href: "#home", icon: <IoHomeOutline /> },
    { name: "skills", href: "#skills", icon: <CgCodeSlash /> },
    { name: "about", href: "#about", icon: <IoPersonOutline /> },
    { name: "projects", href: "#projects", icon: <IoCodeWorking /> },
    { name: "contact me", href: "#contact", icon: <IoCallOutline  /> },
  ];
  //we will make 2 headers one for small screens (default as tailwind is a mobile first and the big one in this component that appears only on lg)
  return (
    <>
      <HeaderPhone links={links} />
      <header
        className="hidden lg:flex sticky lg:w-full lg:z-50  dark:bg-slate-800 dark:text-gray-100 border-b-2 dark:border-slate-900
    lg:h-[7vh] lg:bg-white  lg:justify-between lg:items-center lg:py-12 lg:px-14 lg:text-gray-800 lg:font-semibold 
    capitalize tracking-wide "
      >
        <div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className=" font-semibold text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent border-pink-500 p-4 border-2 shadow-xl"
          >
            N.H
          </motion.h2>
        </div>
        <ul className="flex gap-12 justify-end items-center text-gray-800 dark:text-gray-300 ">
          {links.map((link) => (
            <li
              className={`${
                active === link.href && "active"
              } hover:text-pink-400 transition-all duration-100 flex items-center gap-1 text-2xl `}
            >
              {link.icon && link.icon} <a href={link.href}>{link.name}</a>
            </li>
          ))}
          <li>
            <DarkBtn />
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
