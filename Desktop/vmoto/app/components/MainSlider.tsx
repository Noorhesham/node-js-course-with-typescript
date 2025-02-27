"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { SkewedButton } from "./ButtonCustom";
import styles from "../HeroSlider.module.css"; // Import as a module
const slides = [
  {
    title: "ELECTRIFY YOUR WORLD",
    image: "/slide1.jpg",
    cta: "DISCOVER THE ELECTRIC SOLUTION",
  },
  {
    title: "SUSTAINABLE MOBILITY",
    image: "/slide2.jpg",
    cta: "EXPLORE OUR SOLUTIONS",
  },
  {
    title: "FUTURE OF TRANSPORT",
    image: "/slide3.jpg",
    cta: "JOIN THE REVOLUTION",
  },
  {
    title: "URBAN MOBILITY",
    image: "/slide4.jpg",
    cta: "VIEW OUR RANGE",
  },
  {
    title: "ECO-FRIENDLY DELIVERY",
    image: "/slide5.jpg",
    cta: "BUSINESS SOLUTIONS",
  },
  {
    title: "ELECTRIC PERFORMANCE",
    image: "/slide6.jpg",
    cta: "DISCOVER MORE",
  },
  {
    title: "SMART COMMUTING",
    image: "/slide8.jpg",
    cta: "LEARN MORE",
  },
  {
    title: "ZERO EMISSIONS",
    image: "/slide9.jpg",
    cta: "GO GREEN TODAY",
  },
  {
    title: "CITY EXPLORER",
    image: "/slide10.jpg",
    cta: "START YOUR JOURNEY",
  },
  {
    title: "FLEET SOLUTIONS",
    image: "/slide11.jpg",
    cta: "CORPORATE PROGRAMS",
  },
  {
    title: "ELECTRIC INNOVATION",
    image: "/slide12.jpg",
    cta: "SEE WHAT'S NEW",
  },
  {
    title: "SUSTAINABLE DELIVERY",
    image: "/slide13.jpg",
    cta: "BUSINESS FLEET",
  },
  {
    title: "URBAN FREEDOM",
    image: "/slide14.jpg",
    cta: "EXPLORE MODELS",
  },
  {
    title: "ECO MOBILITY",
    image: "/slide15.jpg",
    cta: "GO ELECTRIC",
  },
  {
    title: "FUTURE READY",
    image: "/slide16.jpg",
    cta: "LEARN MORE",
  },
  {
    title: "SMART TRANSPORT",
    image: "/slide17.jpg",
    cta: "DISCOVER NOW",
  },
  {
    title: "CLEAN ENERGY",
    image: "/slide19.jpg",
    cta: "JOIN THE MOVEMENT",
  },
  {
    title: "ELECTRIC POWER",
    image: "/slide20.jpg",
    cta: "EXPERIENCE MORE",
  },
  {
    title: "GREEN MOBILITY",
    image: "/slide21.jpg",
    cta: "START TODAY",
  },
  {
    title: "FUTURE MOBILITY",
    image: "/slide22.jpg",
    cta: "DISCOVER THE FUTURE",
  },
];

export function HeroSlider() {
  return (
    <div className={` ${styles.heroSlider}  relative heroSlider special h-[100vh] w-full`}>
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={600} // Faster transition speed
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-20 left-24 flex flex-col items-start justify-center px-4 text-center">
                <h1 className="mb-8 text-2xl font-bold tracking-[0.2em] text-white sm:text-4xl">{slide.title}</h1>
                <SkewedButton className="group font-semibold relative overflow-hidden rounded-md bg-cyan-400 px-6 py-3 text-sm  text-black transition-transform hover:scale-105">
                  <span className="relative  z-10">{slide.cta}</span>
                  <div className="absolute inset-0 z-0 bg-cyan-200 transition-transform duration-300 group-hover:-translate-y-full" />
                </SkewedButton>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
