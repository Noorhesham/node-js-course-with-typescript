"use client";
import React, { useEffect, useState, useRef } from "react";
import { useLoading } from "../context/LoadingContext";
import gsap from "gsap";

import FirstSlide from "./slides/FirstSlide";
import SecondSlide from "./slides/SecondSlide";
import Pagination from "./Pagination";
import ThirdSlide from "./slides/ThirdSlide";
import FourthSlide from "./slides/FourthSlide";
import { useSmoothScroll } from "../context/ScrollProviderContext";
import PhoneSlide from "./slides/PhoneSlide";
import SecondScene from "./SecondScene";
import { useSlider } from "../context/useSlider";
import { useIsMobile } from "../context/useIsMobile";

const FirstScene = () => {
  const { isMobile } = useIsMobile();
  const lastSlideAnimation = () => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.set(".img3", { autoAlpha: 0 });
      gsap.set(".img2", { autoAlpha: 0 });
      gsap
        .timeline({ onComplete: () => setAnimateParagraph(true) })
        .fromTo(".slide", { translateX: "-66%" }, { translateX: "-100%" })
        .to(".img4", { autoAlpha: 0 });
    });
    mm.add("(max-width: 767px)", () => {
      gsap.timeline({ onComplete: () => setAnimateParagraph(true) });
    });
  };
  const mouseLeaveAnimation = () => {
    if (isMobile) return;
    gsap
      .timeline()
      .fromTo(".number", { y: 0, opacity: 1 }, { y: -100, opacity: 0, duration: 0.2, ease: "power2.out" })
      .fromTo(".number2", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }, "<");
  };
  const { isLoading } = useLoading();
  const videRef = useRef<HTMLVideoElement>(null);
  const [animateParagraph, setAnimateParagraph] = useState(false);
  const { locoScroll } = useSmoothScroll();
  const isChangingSlide = useRef(false);
  const { handlePrev, handleNextSlide, progress, isClickable, currentSlideIndex, setIsClickable, TOTAL_SLIDES } =
    useSlider({
      customAnimation: lastSlideAnimation,
      customStateSetter: setAnimateParagraph,
      mouseLeaveAnimation: mouseLeaveAnimation,
    });
  useEffect(() => {
    if (!isLoading) videRef.current?.play();
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || !locoScroll) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        setAnimateParagraph(true);
        setIsClickable(true);
        isChangingSlide.current = true;
      }

      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        gsap
          .timeline({ onComplete: () => setAnimateParagraph(true) })
          .from(".btn--nav", { width: 0, delay: 1 })
          .from(".number", { y: 200, skewX: 20, opacity: 0 })
          .from(".arrow", { x: -300, opacity: 0 }, "<0.2");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".first-scene",
              start: "top top",
              scrub: true,
              scroller: ".main-container",
              end: "+=4000",
              pin: true,
            },
          })
          .to(".x-screen", { yPercent: -95 })
          .to(".slideshow", { xPercent: -100 })
          .to(".right-mind ", { xPercent: -20 }, "<");
      });
    });

    return () => ctx.revert();
  }, [isLoading, locoScroll]);

  return (
    <section className="relative first-scene   h-screen">
      <Pagination
        className="absolute bottom-0    right-0 md:bottom-0 md:right-40  "
        handlePrev={handlePrev}
        progress={progress}
        currentSlideIndex={currentSlideIndex}
        handleNextSlide={handleNextSlide}
        isClickable={isClickable}
        mouseLeaveAnimation={mouseLeaveAnimation}
        TOTAL_SLIDES={TOTAL_SLIDES}
      />
      {isMobile && <PhoneSlide currentIndex={currentSlideIndex} />}
      {!isMobile && (
        <>
          <FirstSlide animateParagraph={animateParagraph} videRef={videRef} />
          <SecondSlide currentSlideIndex={currentSlideIndex} />
          <ThirdSlide currentSlideIndex={currentSlideIndex} />
          <FourthSlide currentSlideIndex={currentSlideIndex} />
          <SecondScene />
        </>
      )}
    </section>
  );
};

export default FirstScene;
