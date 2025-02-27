"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import "swiper/css";
import "swiper/css/navigation";

const categories = ["E-MOTO", "E-SCOOTER", "E-FLEET", "CHARGING SYSTEMS"];

const products = {
  "E-MOTO": [
    {
      name: "OFF-R",
      image: "/stash.png",
    },
    {
      name: "ON-R",
      image: "/stash.png",
    },
    {
      name: "STASH",
      image: "/stash.png",
    },
    {
      name: "TC MAX",
      image: "/stash.png",
    },
    {
      name: "TC MAX",
      image: "/stash.png",
    },
  ],
  // Add other category products here
};

export function ModelRange() {
  const [activeCategory, setActiveCategory] = React.useState("E-MOTO");
  const swiperRef = React.useRef<SwiperType>();

  return (
    <section className="relative py-16">
      <MaxWidthWrapper noPadding className="flex flex-col">
        <h2 className="specail mb-2 w-fit border-b border-input text-base font-light tracking-[0.2em]">MODEL RANGE</h2>
        <div className="flex items-center justify-between">
          {/* Mobile Select */}
          <div className="md:hidden w-[200px]">
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-full bg-transparent border-gray-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    <span className="font-semibold special">{category}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Buttons */}
          <div className="mb-12 hidden md:flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative px-6 py-3 text-sm transition-all",
                  "before:absolute before:inset-0 before:-skew-x-12 before:bg-gray-100",
                  "hover:before:bg-gray-200",
                  activeCategory === category && "before:bg-cyan-200 hover:before:bg-cyan-300"
                )}
              >
                <span className="relative font-semibold special z-10">{category}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
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

      <MaxWidthWrapper noPadding className="relative flex flex-col items-end">
        <div className="relative max-w-full lg:max-w-[77rem] overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={32}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="!overflow-visible"
          >
            {products[activeCategory as keyof typeof products]?.map((product, i) => (
              <SwiperSlide key={i}>
                <div className="group relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-center font-mono tracking-[0.2em]">{product.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
