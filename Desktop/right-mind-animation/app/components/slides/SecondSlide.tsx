"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Paragraph from "../Paragraph";

const SecondSlide = ({ currentSlideIndex }: { currentSlideIndex: number }) => {
  const whenToAnimate = currentSlideIndex === 1;
  //to save the timeline so that i can pass it to the paragraph component
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!whenToAnimate) return;

    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline();
      timeline.current
        .fromTo(".paragraph span", { autoAlpha: 1 }, { autoAlpha: 0, stagger: { amount: 0.1 } })
        .to(".slide", { translateX: "50%" })
        .fromTo(".img2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
      // .set(".img2", { autoAlpha: 1 });
    });

    return () => ctx.revert();
  }, [currentSlideIndex, whenToAnimate]);

  return (
    <>
      <div className="slide absolute z-20 bg-[#555555] translate-y-[100%] md:translate-y-0 md:translate-x-[100%] w-full h-full"></div>
      <div className=" w-full md:w-1/2 img2 opacity-0 h-[30vh]  md:h-screen relative">
        <Image src="/2-xxxl.webp" fill className="object-cover" alt="Second slide" />
      </div>
      <Paragraph
        height="h-20"
        animate={whenToAnimate}
        playAfterTL={true}
        timeline={timeline.current || undefined} // Pass the timeline reference
        className="paragraph-2 !text-7xl  capitalize  bottom-auto top-64 md:bottom-80  md:top-auto lg:bottom-64 absolute left-10 lg:left-40"
        text="Life style"
      />

      <Paragraph
        height="h-8"
        animate={whenToAnimate}
        playAfterTL={true}
        timeline={timeline.current || undefined}
        className="paragraph-2  lowercase top-[40%] max-w-xl lg:top-auto  lg:bottom-20 absolute right-10 lg:left-96 !text-xl   z-40"
        text="Right Mind is a leading company in the real estate development sector, providing innovative and effective solutions to meet the demands of the modern real estate market. We focus on quality, modern designs, and sustainability, striving to balance luxury with functionality across all our projects."
      />
    </>
  );
};

export default SecondSlide;
