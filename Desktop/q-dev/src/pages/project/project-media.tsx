"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Play } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import Header from "@/components/Header";

const videos = [
  {
    id: 1,
    thumbnail: "/Rectangle 7 (5).png",
  },
  {
    id: 2,
    thumbnail: "/Rectangle 7 (5).png",
  },
  {
    id: 3,
    thumbnail: "/Rectangle 7 (5).png",
  },
  {
    id: 4,
    thumbnail: "/Rectangle 7 (5).png",
  },
];

export default function Images() {
  return (
    <div className="relative min-h-screen bg-[#003B5C]">
      <MaxWidthWrapper className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-16">
          <div className=" self-center mx-auto my-5 w-fit flex flex-col !items-center text-center">
            <Header className=" !items-center text-center" col view={false} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={24}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              className="w-full"
            >
              {videos.map((video) => (
                <SwiperSlide key={video.id}>
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden group cursor-pointer">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={`Video ${video.id}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}
