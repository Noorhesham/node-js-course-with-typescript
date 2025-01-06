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
import Image from "next/image";
import PhoneSlide from "./slides/PhoneSlide";
import SecondScene from "./SecondScene";
import { ScrollTrigger } from "gsap/all";
const SLIDE_DURATION = 17000;
const PROGRESS_INTERVAL = 50;
const TOTAL_SLIDES = 4;
const FirstScene = () => {
  const { isLoading } = useLoading();
  const videRef = useRef<HTMLVideoElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isClickable, setIsClickable] = useState(false);
  const [animateParagraph, setAnimateParagraph] = useState(false);
  const { locoScroll } = useSmoothScroll();
  const isChangingSlide = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
          .to(".x-screen", { yPercent: -100 })
          .to(".slideshow", { xPercent: -100 })
          .to(".right-mind ", { xPercent: -20 }, "<");
      });

    });

    return () => ctx.revert();
  }, [isLoading, ]);

  useEffect(() => {
    if (isLoading || isMobile) return;
    let progressInterval: NodeJS.Timeout;

    const startProgress = () => {
      setProgress(0);
      setIsClickable(false);
      isChangingSlide.current = true;

      const increment = 100 / (SLIDE_DURATION / PROGRESS_INTERVAL);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            handleNextSlide();
          }
          return Math.min(newProgress, 100);
        });
      }, PROGRESS_INTERVAL);

      setTimeout(() => setIsClickable(true), 1500);
    };

    startProgress();
    return () => clearInterval(progressInterval);
  }, [currentSlideIndex, isLoading, isMobile]);

  const mouseLeaveAnimation = () => {
    if (isMobile) return;
    gsap
      .timeline()
      .fromTo(".number", { y: 0, opacity: 1 }, { y: -100, opacity: 0, duration: 0.4, ease: "power2.out" })
      .fromTo(".number2", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "<");
  };
  const handleNextSlide = () => {
    if (isChangingSlide.current) {
      console.log(currentSlideIndex);
      setAnimateParagraph(false);
      setCurrentSlideIndex((prev) => (prev >= TOTAL_SLIDES - 1 ? 0 : prev + 1));
      if (!isMobile) {
        isChangingSlide.current = false;
        mouseLeaveAnimation();
        gsap.from(".number", { y: 200, skewX: 20, opacity: 0 });
      }
      if (currentSlideIndex === TOTAL_SLIDES - 1) lastSlideAnimation();
    }
  };
  const handlePrev = () => {
    if (isChangingSlide.current) {
      setAnimateParagraph(false);
      gsap.to("paragraph", { autoAlpha: 0 });
      isChangingSlide.current = false;
      console.log(currentSlideIndex);
      setCurrentSlideIndex((prev) => (prev <= 0 ? TOTAL_SLIDES - 1 : prev - 1));
    }
  };
  const lastSlideAnimation = () => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.set(".img3", { autoAlpha: 0 });
      gsap.set(".img2", { autoAlpha: 0 });
      gsap
        .timeline({ onComplete: () => setAnimateParagraph(true) })
        .fromTo(".slide", { translateX: "-66%" }, { translateX: "-100%" })
        .to(".img4", { width: 0 }, "+=0.5");
    });
    mm.add("(max-width: 767px)", () => {
      setAnimateParagraph(true);
      gsap
        .timeline()
        .fromTo(".slide", { translateY: "30%" }, { translateY: "100%" })
        .to(".img", { opacity: 0 }, "+=0.5");
    });
  };
  return (
    <section className="relative first-scene   h-screen">
      <Pagination
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
        </>
      )}
      <SecondScene />
    </section>
  );
};

export default FirstScene;
