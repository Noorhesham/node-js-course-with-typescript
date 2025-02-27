"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import MaxWidthWrapper from "./MaxWidthWrapper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SkewedButton } from "./ButtonCustom";
import styles from "../brand.module.css"; // Import as a module
const ambassadors = [
  {
    name: "DARIO MARCHETTI",
    role: "BRAND AMBASSADOR",
    description:
      "Dario Marchetti, former pro rider and Technical Director of the Ducati DRE Racetrack Academy and DRE Road.",
    image: "/ss1.webp",
  },
  {
    name: "MARCO ROSSI",
    role: "BRAND AMBASSADOR",
    description: "Leading expert in electric motorcycle development with over 15 years of racing experience.",
    image: "/ss2.webp",
  },
  {
    name: "ELENA FERRARI",
    role: "BRAND AMBASSADOR",
    description: "Professional rider and sustainability advocate, pioneering electric racing competitions.",
    image: "/ss3.webp",
  },
  {
    name: "ELENA FERRARI",
    role: "BRAND AMBASSADOR",
    description: "Professional rider and sustainability advocate, pioneering electric racing competitions.",
    image: "/ss4.webp",
  },
];

export function BrandAmbassadors() {
  const swiperRef = React.useRef<SwiperType>();

  return (
    <section className={`relative brand-ambassadors ${styles.brandambassadors}`}>
      <MaxWidthWrapper noPadding className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="specail mb-2 w-fit border-b border-input text-base font-light tracking-[0.2em]">
            BRAND AMBASSADORS
          </h2>
          <div className="my-5 flex gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="rounded-2xl bg-gray-100 p-3 transition-colors hover:bg-gray-200"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="rounded-2xl bg-gray-100 p-3 transition-colors hover:bg-gray-200"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper noPadding className="relative  flex flex-col items-end">
        <div className="relative max-w-full lg:max-w-[77rem] overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            slidesPerView={1}
            spaceBetween={32}
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="!overflow-visible !brand-ambassadors"
          >
            {ambassadors.map((ambassador, i) => (
              <SwiperSlide key={i}>
                <div className="grid grid-cols-1  lg:pb-0 pb-10 gap-8 md:grid-cols-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={ambassador.image || "/placeholder.svg"}
                      alt={ambassador.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="specail border-b-2 border-input w-fit special mb-2 text-sm font-light tracking-[0.2em] text-gray-600">
                      {ambassador.role}
                    </h3>
                    <h2 className="mb-4 text-2xl lg:text-4xl font-bold tracking-tight">{ambassador.name}</h2>
                    <p className="text-lg text-gray-600">{ambassador.description}</p>
                    <SkewedButton className="w-fit mt-4">Learn more</SkewedButton>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
