"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide4 from "./Slide4";
import Slide5 from "./Slide5";
import Slide6 from "./Slide6";
import Slide7 from "./Slide7";
import { ButtonCustom } from "@/components/ButtonCustom";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import AnimatedSvgQ from "@/components/SvgQ";
import { cn } from "@/lib/utils";
import { redirect, useNavigate } from "react-router-dom";

const slides = [
  { id: 1, component: Slide1 },
  { id: 2, component: Slide2 },
  { id: 3, component: Slide3 },
  { id: 4, component: Slide4 },
  { id: 5, component: Slide5 },
  { id: 6, component: Slide6 },
  { id: 7, component: Slide7 },
];

const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const navigate = useNavigate();
  return (
    <div className={cn("relative  overflow-hidden h-screen", currentSlide !== 5 && "bg-[#003B5C]")}>
      <div className=" mix-blend-multiply absolute left-0 top-0 z-30 w-96">
        <AnimatedSvgQ />
      </div>
      {slides.map((slide, index) => (
        <AnimatePresence initial={false} key={slide.id}>
          {index === currentSlide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {React.createElement(slide.component)}
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Centralized Navigation */}
      <MaxWidthWrapper className="  z-50 w-full  bottom-0 left-28   absolute">
        <div className="  special-font flex items-center gap-4 z-50">
          {" "}
          <ButtonCustom
            variant="outline"
            size="lg"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="backdrop-blur-sm"
          >
            Prev <ChevronLeft className="h-4 w-4" />
          </ButtonCustom>
          <ButtonCustom
            variant="outline"
            size="lg"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="backdrop-blur-sm hover:text-white bg-main text-main2 font-semibold special-font"
          >
            Next <ChevronRight className="h-4 w-4" />
          </ButtonCustom>
        </div>{" "}
        <Button
          onClick={() => (currentSlide === 0 ? navigate("/") : setCurrentSlide(0))}
          variant="default"
          size="lg"
          className="fixed !px-4  !py-6 cursor-pointer hover:bg-white hover:text-gray-800 bottom-8 right-36 duration-200 rounded-full text-white bg-main2 z-50 backdrop-blur-sm"
        >
          <Home className="h-8 w-8" />
        </Button>
      </MaxWidthWrapper>
    </div>
  );
};

export default AboutUs;
