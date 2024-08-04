"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type SwiperType from "swiper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
const SwiperCards = ({
  items,
  className,
  slidesPerView,
  spaceBetween,
  btns,
}: {
  items: any;
  className?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  btns?: boolean;
}) => {
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);

  return (
    <Swiper
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: slidesPerView || 3.4 },
      }}
      onSwiper={(swiper) => setSwiper(swiper)}
      spaceBetween={spaceBetween || 10}
      slidesPerView={slidesPerView || 3.4}
      className="h-96 w-full  flex ml-2   z-40 relative"
    >
      {items.map(({ src, text }: { src: string; text: string }, i: number) => (
        <SwiperSlide className={` ${className || " w-64 h-64 "}  z-50 select-none    relative `} key={i}>
          <Image fill loading="eager" src={src} alt="product image" className=" h-full w-full object-contain " />
          <h1 className=" text-white text-5xl absolute top-1/2 -translate-y-1/2 -translate-x-1/2 font-semibold  left-1/2">{text}</h1>
          <div className=" absolute top-2 w-[95%] left-1/2 -translate-x-1/2 h-[97%] border-2 border-white"></div>
        </SwiperSlide>
      ))}
      {btns && (
        <div className=" flex mb-[104px] items-center justify-center gap-4 mt-20">
          <Button
            onClick={() => swiper?.slidePrev()}
            className=" rounded-full flex px-6 py-4 items-center  border  border-main bg-white text-main duration-150 hover:text-white hover:bg-main"
          >
            <ArrowLeft className="mr-1" />
            Perv
          </Button>
          <Button
            onClick={() => swiper?.slideNext()}
            className=" rounded-full flex px-6 py-4 items-center  border border-main bg-white text-main duration-150 hover:text-white hover:bg-main"
          >
            Next <ArrowRight />
          </Button>
        </div>
      )}
    </Swiper>
  );
};

export default SwiperCards;
