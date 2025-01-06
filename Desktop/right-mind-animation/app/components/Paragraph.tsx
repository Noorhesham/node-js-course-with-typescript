"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";

const Paragraph = ({
  text,
  className,
  animate = true,
  height,
  playAfterTL,
  timeline,
}: {
  text: string;
  className?: string;
  animate?: boolean;
  height?: string;
  playAfterTL?: boolean;
  timeline?: gsap.core.Timeline;
}) => {
  const paragraphRef = React.useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      // gsap.set(paragraphRef.current, { autoAlpha: 1 });

      //this is the paragraph animation that move each character
      const paragraphAnimation = gsap.to(paragraphRef.current?.querySelectorAll("span") as NodeListOf<HTMLElement>, {
        autoAlpha: 1,
        y: 0,
        skewX: 0,
        stagger: { amount: 0.3 },
      });

      //if there is a time line and play after boolean then append this to play after the tl i passed
      if (playAfterTL && timeline) {
        // Append to the given timeline
        timeline.to(paragraphRef.current, { autoAlpha: 1 }).add(paragraphAnimation, "<");
      } else if (playAfterTL) {
        gsap.timeline().to(paragraphRef.current, { autoAlpha: 1 }).add(paragraphAnimation);
      } else {
        // Default ScrollTrigger animation to play this in multiple places on scroll
        ScrollTrigger.create({
          trigger: paragraphRef.current,
          start: "top 90%",
          end: "bottom 40%",
          animation: gsap.timeline().to(paragraphRef.current, { autoAlpha: 1 }).add(paragraphAnimation),
          scroller: ".main-container",
          onLeave: () => gsap.to(paragraphRef.current, { autoAlpha: 0 }),
        });
      }
    });

    return () => ctx.revert();
  }, [animate, playAfterTL, timeline]);

  return (
    <p
      ref={paragraphRef}
      className={`${className || "lg:text-5xl"} flex flex-wrap  opacity-0  max-w-2xl  text-white font-normal`}
    >
      {text.split("").map((char, index) =>
        char === " " ? (
          <span key={index} className="inline-block w-[4px] whitespace-nowrap">
            {" "}
          </span>
        ) : (
          <span
            className={`${height || "h-12"} opacity-0 skew-x-6 translate-y-10 inline-flex overflow-hidden`}
            key={index}
          >
            {char}
          </span>
        )
      )}
    </p>
  );
};

export default Paragraph;
