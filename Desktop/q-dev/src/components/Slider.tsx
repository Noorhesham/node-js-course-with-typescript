"use client";

import { HomeSlide } from "@/slides/HomeSlide";
import { useState } from "react";

const slides = [{ id: "home", component: HomeSlide }];

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="relative">
      <HomeSlide />
    </div>
  );
};
