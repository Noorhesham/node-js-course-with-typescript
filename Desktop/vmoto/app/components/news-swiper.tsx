"use client";

import * as React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { SkewedButton } from "./ButtonCustom";
import MaxWidthWrapper from "./MaxWidthWrapper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../HeroSlider.module.css"; // Import as a module

const news = [
  {
    title: "EICMA 2024",
    date: "Nov 2024",
    image: "/news1.webp",
    link: "/news/eicma-2024",
  },
  {
    title: "Vmoto and Ebixon: a great success for the launch event in Malaysia.",
    date: "May 2024",
    image: "/news2.webp",
    link: "/news/vmoto-ebixon-launch",
  },
  {
    title: "Vmoto to be Official Electric Scooter Supplier of EICMA Riding Fest.",
    date: "Apr 2024",
    image: "/news3.webp",
    link: "/news/eicma-riding-fest",
  },
  {
    title: "New Partnership Announcement",
    date: "Mar 2024",
    image: "/news4.webp",
    link: "/news/partnership",
  },
  {
    title: "Sustainable Urban Mobility Solutions",
    date: "Feb 2024",
    image: "/news5.webp",
    link: "/news/sustainable-mobility",
  },
  {
    title: "Innovation in Electric Vehicle Technology",
    date: "Jan 2024",
    image: "/news6.webp",
    link: "/news/innovation",
  },
];

export function NewsSlider() {
  const swiperRef = React.useRef<SwiperType>();

  return (
    <section className={` ${styles.heroSlider} heroSlider relative py-16`}>
      <MaxWidthWrapper className="flex flex-col">
        <h3 className="specail mb-2 w-fit border-b border-input text-base font-light tracking-[0.2em]">NEWS</h3>
        <h2 className=" mb-4 lg:mb-8 text-3xl lg:text-5xl font-bold">LATEST NEWS</h2>

        <div className="relative  max-w-full overflow-hidden">
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
            spaceBetween={50}
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="!overflow-visible news-slider"
          >
            {news.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="group relative   h-[450px] overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <span className="text-white text-sm">{item.date}</span>
                    <div>
                      <h3 className="text-white text-xl font-bold mb-4">{item.title}</h3>
                      <a href={item.link} className="text-white hover:underline">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12 flex justify-start">
          <SkewedButton>READ ALL NEWS</SkewedButton>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
