"use client";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "./LoadingContext";
import { useIsMobile } from "./useIsMobile";
import gsap from "gsap";

const SLIDE_DURATION = 17000;
const PROGRESS_INTERVAL = 50;
export const useSlider = ({
  customAnimation,
  customStateSetter,
  mouseLeaveAnimation,
  totalSlides = 4,
  TIMETODISABLE = 2000,
}: {
  customAnimation?: () => void;
  customStateSetter?: (s: any) => void;
  mouseLeaveAnimation?: () => void;
  totalSlides?: number;
  TIMETODISABLE?: number;
}) => {
  const TOTAL_SLIDES = totalSlides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isClickable, setIsClickable] = useState(false);
  const { isLoading } = useLoading();
  const isChangingSlide = useRef(false);
  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      setIsClickable(true);
      isChangingSlide.current = true;
    }
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

      setTimeout(() => setIsClickable(true), TIMETODISABLE);
    };

    startProgress();
    return () => clearInterval(progressInterval);
  }, [currentSlideIndex, isLoading, isMobile]);
  const handleNextSlide = () => {
    if (isChangingSlide.current) {
      console.log(currentSlideIndex);
      customStateSetter && customStateSetter(false);
      setCurrentSlideIndex((prev) => (prev >= TOTAL_SLIDES - 1 ? 0 : prev + 1));
      if (!isMobile) {
        isChangingSlide.current = false;
        mouseLeaveAnimation && mouseLeaveAnimation();
        gsap.from(".number", { y: 200, skewX: 20, opacity: 0 });
      }
      if (currentSlideIndex === TOTAL_SLIDES - 1 && customAnimation) customAnimation();
    }
  };
  const handlePrev = () => {
    if (isChangingSlide.current) {
      customStateSetter && customStateSetter(false);
      gsap.to("paragraph", { autoAlpha: 0 });
      isChangingSlide.current = false;
      console.log(currentSlideIndex);
      setCurrentSlideIndex((prev) => (prev <= 0 ? TOTAL_SLIDES - 1 : prev - 1));
    }
  };
  return {
    currentSlideIndex,
    progress,
    isClickable,
    handleNextSlide,
    handlePrev,
    setIsClickable,
    TOTAL_SLIDES,
    isChangingSlide,
  };
};
