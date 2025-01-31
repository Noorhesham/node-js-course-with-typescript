"use client";
import React, { useEffect } from "react";
import { HiOutlineBars2 } from "react-icons/hi2";
import { NAV_LINKS } from "./NavBar";
import { IoMdClose } from "react-icons/io";
import gsap from "gsap";

import Link from "next/link";
import { MAINCOLOR } from "../constants";

const PhoneNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => {
    setIsOpen(true);
    gsap
      .timeline()
      .to(".bgbtn", { backgroundColor: "black" })
      .to(".slide2", { translateX: 0 })
      .to(".link", { opacity: 0.6, stagger: { amount: 0.3 } })
      .duration(1);
  };
  const handleClose = () => {
    gsap
      .timeline({ onComplete: () => setIsOpen(false) })
      .to(".bgbtn", { backgroundColor: MAINCOLOR })
      .to(".link", { opacity: 0, stagger: { amount: 0.3 } })
      .to(".slide2", { translateX: "100%" })
      .duration(1);
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".icon", { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, [isOpen]);
  return (
    <>
      <div
        onClick={!isOpen ? handleOpen : handleClose}
        className=" rounded-full ml-auto w-10 z-[99999] relative h-10 flex bgbtn items-center justify-center bg-main text-white"
      >
        {isOpen ? (
          <IoMdClose className="   text-2xl cursor-pointer duration-100 icon opacity-0" />
        ) : ( 
          <HiOutlineBars2 className="icon text-2xl cursor-pointer opacity-100 duration-100" />
        )}
      </div>
      {
        <div
          className="slide2 flex items-center text-2xl cursor-pointer inset-0 absolute h-screen z-[89]  bg-main2 translate-x-[100%] 
    mdg:hidden  w-full"
        >
          {/* <div className=" w-[80%] h-full absolute right-0 top-10">
            <Image src={"/bg-mobile.svg"} alt="" fill className=" object-contain" />
          </div> */}
          <ul className="flex mx-auto lg:ml-40 items-start  justify-center flex-col gap-5">
            {" "}
            {NAV_LINKS.map((link, i) => (
              <li
                onClick={handleClose}
                className={`link 
               hover:opacity-100 ${`lg:ml-[${
                 i * 10
               }px]`} hover:translate-x-4 duration-150 opacity-0 text-white text-5xl lg:text-7xl uppercase`}
                key={link.link}
              >
                <Link href={link.link}>{link.text}</Link>
              </li>
            ))}
          </ul>
          <a href="tel:+201145838187" className=" text-sm text-white  mt-auto mr-auto w-fit absolute bottom-2 left-2">
            +20 114 583 8187
          </a>
        </div>
      }
    </>
  );
};

export default PhoneNav;
