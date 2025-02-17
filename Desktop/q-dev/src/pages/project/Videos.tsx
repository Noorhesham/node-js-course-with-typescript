"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Play } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const videos = [
  {
    id: 1,
    thumbnail: "/video-thumb-1.jpg",
    video: "/video-1.mp4",
  },
  {
    id: 2,
    thumbnail: "/video-thumb-2.jpg",
    video: "/video-2.mp4",
  },
  {
    id: 3,
    thumbnail: "/video-thumb-3.jpg",
    video: "/video-3.mp4",
  },
  {
    id: 4,
    thumbnail: "/video-thumb-4.jpg",
    video: "/video-4.mp4",
  },
];

export default function Videos() {
  return (
    <div className="relative min-h-screen bg-[#003B5C]">
      <MaxWidthWrapper className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 py-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-cream/80 leading-relaxed max-w-3xl text-center mx-auto"
          >
            Q Developments was established in 2022 to engrave its signature in the Egyptian market for a lifetime by
            introducing quality homes to the Egyptian society in perfectly planned projects that provide integrated
            services.
          </motion.p>

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
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev !w-auto !h-auto !static !mt-0 !translate-y-0 absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <div className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors">
                <span className="text-sm">PREV</span>
              </div>
            </button>
            <button className="swiper-button-next !w-auto !h-auto !static !mt-0 !translate-y-0 absolute right-4 top-1/2 -translate-y-1/2 z-10">
              <div className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors">
                <span className="text-sm">NEXT</span>
              </div>
            </button>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}
