"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
interface TabingProps {
  defaultValue: string;
  options: { label: string; content: ReactNode; href: string }[];
}
import type SwiperType from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Tabing = ({ defaultValue, options }: TabingProps) => {
  const searchParams = useSearchParams();
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const category = searchParams.get("category");
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    if (category && window.location.search.includes(category)) setCurrentPath(category);
    else setCurrentPath(defaultValue);
  }, [category, defaultValue]);
  const handleClick = (href: string) => {
    console.log(href, currentPath);
    router.push(`${window.location.pathname}?category=${href}`, { scroll: false });
    setCurrentPath(href);
  };
  console.log(activeIndex);
  return (
    <div className="w-full mt-[34px]">
      <div className="flex   items-center gap-3">
        <button
          disabled={activeIndex === 0}
          className={` ${
            activeIndex === 0 && " opacity-50"
          } p-1 rounded-full bg-gray-200  text-xs hover:bg-gray-300  duration-150`}
          onClick={() => swiper?.slidePrev()}
        >
          <ArrowLeft />
        </button>
        <Swiper
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 5 },
          }}
          onSlideChange={({ activeIndex }) => setActiveIndex(activeIndex)}
          onSwiper={(swiper) => setSwiper(swiper)}
          spaceBetween={5}
          slidesPerView={5}
          className=" w-full flex items-center"
        >
          {options.map((option, i) => (
            <SwiperSlide key={i}>
              <Button
                onClick={() => handleClick(option.href)}
                className={` ${
                  currentPath === option.href ? " text-white bg-main" : "bg-gray-200 text-gray-900"
                } rounded-full h-[40px] py-4 px-12 w-[200px] hover:bg-main hover:text-white  capitalize `}
              >
                <div>{option.label}</div>
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          disabled={activeIndex === options.length - 1}
          className=" p-1 rounded-full bg-gray-200  text-xs hover:bg-gray-300  duration-150"
          onClick={() => swiper?.slideNext()}
        >
          <ArrowRight />
        </button>
      </div>

      {options.find((option) => option.href === currentPath)?.content}
    </div>
  );
};

export default Tabing;
