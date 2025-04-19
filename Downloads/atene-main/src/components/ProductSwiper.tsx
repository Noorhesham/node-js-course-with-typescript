"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type SwiperType from "swiper";
import "swiper/css";

import { cn } from "./lib/utils";
import { Dialog, DialogContent } from "./ui/dialog";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface ProductSwiperProps {
  images: {
    src: string;
    alt: string;
  }[];
  rtl?: boolean;
  className?: string;
}

const ProductSwiper = ({ images, rtl = true, className }: ProductSwiperProps) => {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!mainSwiper) return;

    mainSwiper.on("slideChange", (swiper) => {
      setActiveIndex(swiper.activeIndex);
    });

    return () => {
      mainSwiper.off("slideChange");
    };
  }, [mainSwiper]);

  const handleZoomClick = (imageSrc: string) => {
    setZoomImage(imageSrc);
    setZoomOpen(true);
  };

  return (
    <div className={cn("relative w-full flex flex-col lg:flex-row-reverse gap-3", className)}>
      {" "}
      {/* Main Swiper */}
      <div className="relative flex-1 aspect-square rounded-xl overflow-hidden">
        <Swiper
          dir={rtl ? "rtl" : "ltr"}
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          onSwiper={setMainSwiper}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute inset-0 bg-gray-100">
                <img
                  src={image.src || "/placeholder.png"}
                  alt={image.alt}
                  className="object-cover absolute inset-0 w-full object-cover h-full cursor-zoom-in"
                  onClick={() => handleZoomClick(image.src)}
                />
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Buttons */}
          <button
            className={cn(
              "absolute top-1/2 z-10 -translate-y-1/2",
              "w-8 h-8 rounded-full bg-white/70 cursor-pointer !p-4 shadow-md flex items-center justify-center",
              "transition-opacity hover:opacity-100",
              rtl ? "right-4" : "left-4"
            )}
            onClick={() => (isMobile ? mainSwiper?.slidePrev() : mainSwiper?.slideNext())}
          >
            <span className="text-gray-600 ">
              <ChevronRight />
            </span>
          </button>
          <button
            className={cn(
              "absolute top-1/2 z-10 -translate-y-1/2",
              "w-8 h-8 rounded-full bg-white/70 cursor-pointer  !p-4  shadow-md flex items-center justify-center",
              "transition-opacity hover:opacity-100",
              rtl ? "left-4" : "right-4"
            )}
            onClick={() => (isMobile ? mainSwiper?.slideNext() : mainSwiper?.slidePrev())}
          >
            <span className="text-gray-600  ">
              <ChevronLeft />
            </span>
          </button>
        </Swiper>
      </div>
      {/* Desktop Vertical Thumbnails */}
      <div className="flex w-full lg:flex-col gap-3 lg:w-20">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative w-20 h-20 cursor-pointer rounded-lg overflow-hidden",
              "transition-opacity duration-200 hover:opacity-100",
              activeIndex === index ? "ring-2 ring-primary ring-offset-2" : "opacity-75"
            )}
            onClick={() => mainSwiper?.slideTo(index)}
          >
            <img
              src={image.src || "/placeholder.png"}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
      {/* Zoom Dialog */}
      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0 bg-transparent border-none">
          {zoomImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={zoomImage} alt="Zoomed product image" className="object-contain w-full h-full" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductSwiper;
