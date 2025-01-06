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
      const media = gsap.matchMedia();

      // Desktop animations
      media.add("(min-width: 768px)", () => {
        timeline.current = gsap.timeline();
        timeline.current
          .to(".paragraph", { autoAlpha: 0, stagger: 0.1 })
          .to(".slide", { translateX: "50%" })
          .to(".img2", { autoAlpha: 1, duration: 0.5 })
          .set(".img2", { autoAlpha: 1 });
      });

      media.add("(max-width: 767px)", () => {
        timeline.current = gsap.timeline();
        timeline.current
          .to(".paragraph", { autoAlpha: 0, stagger: 0.1 })
          .to(".slide", { translateY: "30%" })
          .set(".slide", { translateY: "30%" })
          .to(".img2", { autoAlpha: 1, duration: 0.5 })
          .set(".img2", { autoAlpha: 1 });
      });
      return () => media.revert();
    });

    return () => ctx.revert();
  }, [currentSlideIndex, whenToAnimate]);

  return (
    <>
      <div className="slide absolute z-20 bg-[#555555] translate-y-[100%] md:translate-y-0 md:translate-x-[100%] w-full h-full"></div>
      <div className=" w-full md:w-1/2 img2 opacity-0 h-[30vh]  md:h-screen relative">
        <Image src="/2-xxxl.webp" fill className="object-cover" alt="Second slide" />
      </div>
      <div className="paragraph-2">
        <Paragraph
          height="h-20"
          animate={whenToAnimate}
          playAfterTL={true}
          timeline={timeline.current || undefined} // Pass the timeline reference
          className="paragraph-2   top-40 bottom-auto z-40 md:top-auto lg:bottom-20  absolute left-4 md:left-40 !text-7xl "
          text="Life style"
        />
      </div>

      <div className="paragraph-2">
        <Paragraph
          height="h-8"
          animate={whenToAnimate}
          playAfterTL={true}
          timeline={timeline.current || undefined}
          className=" paragraph-2 bottom-20 absolute right-40 lg:p-0 p-3 text-xl z-40"
          text="Right Mind is a leading company in the real estate development sector, providing innovative and effective solutions to meet the demands of the modern real estate market. We focus on quality, modern designs, and sustainability, striving to balance luxury with functionality across all our projects."
        />
      </div>
    </>
  );
};

export default SecondSlide;
