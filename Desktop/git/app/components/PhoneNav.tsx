"use client";
import { useMotionValue, useTransform, motion, useDragControls } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { IoCreate, IoLibrary, IoSettings } from "react-icons/io5";

const Menus = [
  { name: "Home", icon: <GoHomeFill />, dis: "translate-x-0", href: "/", index: 0 },
  { name: "My orders", icon: <IoCreate />, dis: "translate-x-16", href: "my-quizzes", index: 1 },
  { name: "My Account", icon: <IoSettings />, dis: "translate-x-48", href: "my-profile", index: 2 },
  { name: "Support", icon: <BsFillCollectionPlayFill />, dis: "translate-x-64", href: "my-attempts", index: 3 },
];
const PhoneNav = () => {
  const pathName = usePathname();
  const [active, setActive] = useState(0);
  return (
    <motion.div className="bg-gray-100 min-h-[3rem] lg:hidden py-3 select-none fixed bottom-0 z-50 w-full px-2">
      <ul className="flex relative justify-around w-full">
        {Menus.map((menu, i) => (
          <li key={i} className="">
            {
              <Link
                href={`/${menu.href}`}
                className="flex flex-col items-center text-center "
                onClick={() => setActive(i)}
              >
                <>
                  <div
                    className={`text-xl cursor-pointer duration-500 text-gray-300 ${i === active && " text-gray-950"}`}
                  >
                    {menu.icon}
                  </div>
                  <div className={` ${active === i ? " text-gray-950  duration-700 opacity-100" : " text-gray-400"} text-xs`}>
                    {menu.name}
                  </div>
                </>
              </Link>
            }
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PhoneNav;
