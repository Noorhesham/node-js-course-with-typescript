"use client";
import React, { ReactNode, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type SwiperType from "swiper";
import Image from "next/image";

import { Autoplay } from "swiper/modules"; // Correct import for Autoplay
const SwiperCards = ({
  items,
  className,
  slidesPerView,
  spaceBetween,
  btns,
  paginationImage,
  rounded = false,
  logo,
  samePhone,
  contain = false,
  autoplay,
  mobile,
  md,
  zoom,
}: {
  items: any;
  className?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  btns?: boolean;
  paginationImage?: boolean;
  rounded?: boolean;
  logo?: boolean;
  samePhone?: boolean;
  contain?: boolean;
  autoplay?: boolean;
  mobile?: number;
  md?: number;
  zoom?: boolean;
}) => {
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [slideConfig, setSlideConfig] = React.useState({
    isBeginning: true,
    isEnd: activeIndex === (items.length ?? 0) - 1,
  });
  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (items.length ?? 0) - 1,
      });
    });
  }, [swiper, items]);
  let local = "en";

  // const t = useTranslations();
  return (
    <div className="relative h-full gap-3 w-full flex flex-col">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: mobile ? mobile : logo ? 2 : samePhone ? slidesPerView : 1,
            centeredSlides: logo ? false : true,
          },
          580: { slidesPerView: 2 },
          768: { slidesPerView: md || 2 },
          900: { slidesPerView: slidesPerView || 3 },
          1280: { slidesPerView: slidesPerView || 3.4 },
        }}
        modules={[Autoplay]}
        autoplay={autoplay ? { delay: 2000 } : false}
        loop={autoplay}
        centeredSlides={false}
        initialSlide={0}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={spaceBetween || 10}
        slidesPerView={slidesPerView || 3.4}
        className={`w-full   ${className || "h-96"}`}
      >
        {items.map(({ src, text, card }: { src: string; text: string; card: ReactNode }, i: number) => (
          <SwiperSlide className={`w-full h-full  ${rounded ? "rounded-2xl" : ""}`} key={i}>
            {card ? (
              <div className="  w-full"> {card}</div>
            ) : (
              <>
                {
                  <Image
                    fill
                    loading="eager"
                    src={src}
                    alt="product image"
                    className={` object-center h-full w-full  ${
                      rounded && !contain ? "rounded-2xl object-cover" : "object-contain"
                    } ${contain ? " object-contain" : "object-contain  2xl:object-cover"}`}
                  />
                }
                {text && (
                  <h1 className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
                    {text}
                  </h1>
                )}
                {text && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[95%] h-[97%] border-2 border-white"></div>
                )}
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCards;
