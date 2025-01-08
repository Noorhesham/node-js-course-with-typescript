"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import { useSmoothScroll } from "../context/ScrollProviderContext";

const Paragraph = ({
  text,
  className,
  animate = true,
  height,
  playAfterTL,
  timeline,text2
}: {
  text: string;
  className?: string;
  animate?: boolean;
  height?: string;
  playAfterTL?: boolean;
  timeline?: gsap.core.Timeline;text2?:string
}) => {
  const paragraphRef = React.useRef<HTMLParagraphElement>(null);
  const { isLoading } = useLoading();
  const { locoScroll } = useSmoothScroll();
  useEffect(() => {
    if (!animate || isLoading || !locoScroll) return;

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
        timeline.add(paragraphAnimation, "<");
      } else if (playAfterTL) {
        gsap.timeline().add(paragraphAnimation)
      } else {
        // Default ScrollTrigger animation to play this in multiple places on scroll
        ScrollTrigger.create({
          trigger: paragraphRef.current,
          start:()=> "top 90%",
          end: "bottom 40%",
          animation: gsap.timeline().add(paragraphAnimation),
          scroller: ".main-container",
        });
      }
    });

    return () => ctx.revert();
  }, [animate, playAfterTL, timeline, isLoading, locoScroll]);

  return (
    <div
      ref={paragraphRef}
      className={`${className || "lg:text-5xl"} flex flex-wrap flex-col    max-w-2xl  text-white font-normal`}
    >
      {text.split("<br>").map((line, lineIndex) => (
        <div className="line flex flex-wrap" key={lineIndex}>
          {line.split("").map((char, charIndex) =>
            char === " " ? (
              <span key={charIndex} className="inline-block w-[5px] whitespace-nowrap">
                {" "}
              </span>
            ) : (
              <span
                className={`${height || "h-12"} ${lineIndex>0&&text2} opacity-0 skew-x-6 translate-y-10 inline-flex overflow-hidden`}
                key={charIndex}
              >
                {char}
              </span>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Paragraph;
