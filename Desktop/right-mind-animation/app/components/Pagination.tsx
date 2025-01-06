import React from "react";
import Arrow from "./Arrow";
import ProgressCircle from "./ProgressCircle";
import gsap from "gsap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Pagination = ({
  currentSlideIndex,
  handleNextSlide,
  isClickable,
  mouseLeaveAnimation,
  TOTAL_SLIDES,
  progress,
  handlePrev,
}: {
  currentSlideIndex: number;
  handleNextSlide: () => void;
  isClickable: boolean;
  mouseLeaveAnimation: () => void;
  TOTAL_SLIDES: number;
  progress: number;
  handlePrev: () => void;
}) => {
  const isMobile = window.innerWidth <= 768;
  const handleHover = (buttonClass: string, arrowClass: string) => {
    gsap.to(buttonClass, { backgroundColor: "black", duration: 0.3 });
    gsap.to(arrowClass, { color: "white", duration: 0.3 });
  };

  const handleMouseLeave = (buttonClass: string, arrowClass: string) => {
    gsap.to(buttonClass, { backgroundColor: "white", duration: 0.3 });
    gsap.to(arrowClass, { color: "black", duration: 0.3 });
  };

  return (
    <div
      onClick={() => isClickable && handleNextSlide()}
      className={`btn--nav  w-3/4 h-24 md:w-[calc(var(--spacing)*4)] md:h-[calc(var(--spacing)*8)]  absolute bottom-0   right-0 md:bottom-auto md:right-auto md:top-0 bg-[#fa4500] z-30 md:left-1/3 ${
        isClickable ? "cursor-pointer" : "pointer-events-none"
      }`}
    >
      <div
        onMouseOver={() => mouseLeaveAnimation()}
        onMouseLeave={() => {
          gsap
            .timeline()
            .fromTo(".number2", { y: 0, opacity: 1 }, { y: 100, opacity: 0, duration: 0.4, ease: "power2.in" })
            .fromTo(".number", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.in" }, "<");
        }}
        className="h-40 absolute hidden md:block top-[35%] overflow-hidden w-full"
      >
        <span className="text-lg  text-gray-900 text-center z-20 font-thin absolute right-5  -bottom-1 ">
          /{TOTAL_SLIDES}
        </span>
        <span className="text-[8rem] number md:block hidden text-gray-900 text-center z-20 font-thin absolute left-1/2  bottom-0 -translate-x-1/2  mx-auto">
          {currentSlideIndex + 1}
        </span>
        <span
          className="text-[8rem] number2 bottom-0  md:block hidden text-gray-900 absolute left-1/2 
      -translate-x-1/2  translate-y-52 opacity-0 text-center z-20 font-thin  mx-auto"
        >
          {currentSlideIndex + 1}
        </span>
        <Arrow className="arrow  absolute z-40 top-[76%] left-[52%] -translate-x-1/2 -translate-y-1/2 text-white " />
      </div>
      <ProgressCircle progress={progress} />
      <span className="text-lg  text-white md:hidden block text-center z-20 font-thin absolute left-10  bottom-1/2 ">
        {currentSlideIndex + 1}/{TOTAL_SLIDES}
      </span>
      <div className="flex z-[500] md:hidden absolute bottom-2 right-4 items-center gap-3">
        <button
          // disabled={currentSlideIndex === 0}
          onClick={() => {
            handlePrev();
            gsap.to(".bt2", { backgroundColor: "black" });
          }}
          onMouseEnter={() => handleHover(".btn1", ".btn1-arrow")}
          onMouseLeave={() => handleMouseLeave(".btn1", ".btn1-arrow")}
          className="btn1 w-10 justify-center flex items-center h-10 rounded-full   bg-white"
        >
          <BsArrowLeft className="btn1-arrow  text-black" />
        </button>
        <button
          onMouseEnter={() => handleHover(".btn2", ".btn2-arrow")}
          onMouseLeave={() => handleMouseLeave(".btn2", ".btn2-arrow")}
          onClick={(e) => {
            e.stopPropagation();
            handleNextSlide();
          }}
          className="btn2 w-10 justify-center flex items-center h-10 rounded-full   bg-white"
        >
          <BsArrowRight className="btn2-arrow text-black" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
