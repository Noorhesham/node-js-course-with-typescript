"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useEffect } from "react";
import { BiPhoneIncoming } from "react-icons/bi";
import { useLoading } from "../context/LoadingContext";
import { useIsMobile } from "../context/useIsMobile";

const ContactUs = () => {
  const { isLoading } = useLoading();
  const {isMobile}=useIsMobile()
  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".contactus",
        start: isMobile?"top 30%":"top 10%",
        scroller: ".main-container",
        animation: gsap
          .timeline()
          .from(".text1", { clipPath: " polygon(60% 0, 61% 0, 53% 100%, 52% 100%)" })
          .from(".text2", { clipPath: " polygon(60% 0, 61% 0, 53% 100%, 52% 100%)" }, "<"),
      });
    });
    return () => ctx.revert();
  }, [isLoading]);
  return (
    <section className=" flex justify-center  items-center contactus  h-[80vh] lg:h-screen relative w-full">
      <Image src="/Rectangle 2981.png" className=" object-cover" alt="" fill />
      <div className=" absolute w-full lg:w-[30%]  text-[10vw] text-nowrap lg:text-[7vw] uppercase text-white flex flex-col items-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ">
        <div
          style={{ clipPath: "  polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          className=" translate-y-[55px]  w-full lg:-translate-x-24 text1 mr-auto"
        >
          Contact
        </div>
        <div className=" w-20 h-20 flex z-40 justify-center rounded-full bg-main">
          <BiPhoneIncoming className=" text-4xl  text-center  text-white m-auto" />
        </div>
        <div
          style={{ clipPath: "  polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          className=" ml-auto  translate-y-[-65px] text2 lg:translate-x-24 text2 w-fit"
        >
          us now
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
