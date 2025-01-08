"use client";
import React, { useEffect } from "react";
import { HiOutlineBars2 } from "react-icons/hi2";
import { NAV_LINKS } from "./NavBar";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import gsap from "gsap";
import Image from "next/image";
import RightMindLogo from "./RightMindLogo";
import { useIsMobile } from "../context/useIsMobile";
import { useSmoothScroll } from "../context/ScrollProviderContext";

const PhoneNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { locoScroll } = useSmoothScroll();
  const { isMobile } = useIsMobile();
  const handleOpen = () => {
    if (!locoScroll) return;
    setIsOpen(true);
    locoScroll?.start();

    gsap
      .timeline()
      .to(".bgbtn", { backgroundColor: "black" })
      .to(".slide2", { translateX: 0 })
      .to(".link", { opacity: 1, stagger: { amount: 0.3 } })
      .duration(1);
  };
  const handleClose = () => {
    if (!locoScroll) return;
    console.log(locoScroll)
    locoScroll?.stop();
    gsap
      .timeline({ onComplete: () => setIsOpen(false) })
      .to(".bgbtn", { backgroundColor: "#ea580c" })
      .to(".link", { opacity: 0, stagger: { amount: 0.3 } })
      .to(".slide2", { translateX: "100%" })
      .duration(1);
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".icon", { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, [isOpen, locoScroll]);
  if (!isMobile) return null;
  return (
    <>
      <div
        onClick={!isOpen ? handleOpen : handleClose}
        className=" rounded-full ml-auto w-10 z-[99] h-10 flex bgbtn items-center justify-center bg-main text-white"
      >
        {isOpen ? (
          <IoMdClose className=" duration-100 icon opacity-0" />
        ) : (
          <HiOutlineBars2 className="icon opacity-100 duration-100" />
        )}
      </div>
      {
        <div
          className="slide2 flex items-center inset-0 absolute h-screen z-[89] bg-[#555555] translate-x-[100%] 
    mdg:hidden  w-full"
        >
          <div className=" absolute top-3 left-3">
            <RightMindLogo />
          </div>

          <div className=" w-[80%] h-full absolute right-0 top-10">
            <Image src={"/bg-mobile.svg"} alt="" fill className=" object-contain" />
          </div>
          <ul className="flex items-start ml-4 justify-center flex-col gap-0">
            {" "}
            {NAV_LINKS.map((link) => (
              <li className="link opacity-0 text-white text-4xl uppercase" key={link}>
                <Link href="/">{link}</Link>
              </li>
            ))}
          </ul>
          <span className=" text-sm  mt-auto mr-auto w-fit absolute bottom-2 left-2">+7 495 967 69 23</span>
        </div>
      }
    </>
  );
};

export default PhoneNav;
