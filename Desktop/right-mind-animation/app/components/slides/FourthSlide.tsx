import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Paragraph from "../Paragraph";
import gsap from "gsap";

const FourthSlide = ({ currentSlideIndex }: { currentSlideIndex: number }) => {
  const whenToAnimate = currentSlideIndex === 3;
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!whenToAnimate) return;
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline();
      timeline.current
        .fromTo(".paragraph3 span", { autoAlpha: 1 }, { autoAlpha: 0, stagger: { amount: 0.1 } })
        .fromTo(".slide", { translateX: "33%" }, { translateX: "0%" })
        .to(".slide", { translateX: "-66%" })
        .fromTo(".img4", { width: 0 }, { width: "100%", duration: 0.5, autoAlpha: 1 })
        .set(".img4", { width: "100%", autoAlpha: 1 });
    });

    return () => ctx.revert();
  }, [currentSlideIndex]);
  return (
    <div className=" absolute inset-0">
      <div className=" img4 md:scale-100 scale-125  w-full md:opacity-0 h-[30vh] md:h-screen relative">
        <Image src="/4-xxxl.webp" fill className="object-cover" alt="Second slide" />
      </div>{" "}
      <Paragraph
        height="h-20"
        animate={whenToAnimate}
        playAfterTL={true}
        timeline={timeline.current || undefined} // Pass the timeline reference
        // className="  bottom-64 lg:bottom-44 absolute left-20 lg:left-40 !text-7xl z-40"
        className="paragraph4 !text-7xl  capitalize z-40  bottom-auto top-64 md:bottom-80  md:top-auto lg:bottom-64 absolute left-10 lg:left-40"
        text="Life style"
      />
      <Paragraph
        height="h-8"
        animate={whenToAnimate}
        playAfterTL={true}
        timeline={timeline.current || undefined}
        className="paragraph4  lowercase top-[40%] max-w-xl lg:top-auto  lg:bottom-20 absolute right-10 lg:left-96 !text-xl   z-40"
        text="Right Mind is a leading company in the real estate development sector, providing innovative and effective solutions to meet the demands of the modern real estate market. We focus on quality, modern designs, and sustainability, striving to balance luxury with functionality across all our projects."
      />
    </div>
  );
};

export default FourthSlide;
