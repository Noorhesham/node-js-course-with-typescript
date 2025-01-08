import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Paragraph from "../Paragraph";

const ThirdSlide = ({ currentSlideIndex }: { currentSlideIndex: number }) => {
  const whenToAnimate = currentSlideIndex === 2;
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!whenToAnimate) return;
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline();
      timeline.current
        .fromTo(".paragraph-2 span", { autoAlpha: 1 }, { autoAlpha: 0, opacity: 0 })
        .fromTo(".slide", { translateX: "50%" }, { translateX: "33%" })
        .to(".img3", { autoAlpha: 1, duration: 0.5 })
        .fromTo(".img2", { autoAlpha: 1 }, { autoAlpha: 0 })
        .set(".img3", { autoAlpha: 1 });
    });

    return () => ctx.revert();
  }, [currentSlideIndex]);
  return (
    <div className=" absolute inset-0">
      {" "}
      <div className=" w-full md:w-1/3 img3 opacity-0 h-[30vh] md:h-screen relative">
        <Image src="/3-xxxl.webp" fill className="object-cover" alt="Second slide" />
      </div>{" "}
      <div className="paragraph3">
        <Paragraph
          height="h-20"
          animate={whenToAnimate}
          playAfterTL={true}
          timeline={timeline.current || undefined} // Pass the timeline reference
          className="paragraph3 !text-7xl  capitalize  bottom-auto top-64 md:bottom-80  md:top-auto lg:bottom-64 absolute left-10 lg:left-40"
          text="Life style"
        />
      </div>
      <div className="paragraph3">
        <Paragraph
          height="h-8"
          animate={whenToAnimate}
          playAfterTL={true}
          timeline={timeline.current || undefined}
          className="paragraph3  lowercase top-[40%] max-w-xl lg:top-auto  lg:bottom-20 absolute right-10 lg:left-96 !text-xl   z-40"
          text="Right Mind is a leading company in the real estate development sector, providing innovative and effective solutions to meet the demands of the modern real estate market. We focus on quality, modern designs, and sustainability, striving to balance luxury with functionality across all our projects."
        />
      </div>
    </div>
  );
};

export default ThirdSlide;
