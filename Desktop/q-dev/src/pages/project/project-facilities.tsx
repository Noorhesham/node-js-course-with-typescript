"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SvgQ2 from "@/components/SvgQ2";
import Header from "@/components/Header";

const facilities = [
  { icon: "/icons/pool.svg", title: "3 Swimming pools" },
  { icon: "/icons/beach.svg", title: "Private beach" },
  { icon: "/icons/club.svg", title: "Club house" },
  { icon: "/icons/hotel.svg", title: "Hotel" },
  { icon: "/icons/mall.svg", title: "Commercial area & strip mall" },
  { icon: "/icons/lagoon.svg", title: "Crystal lagoon" },
  { icon: "/icons/landscape.svg", title: "Landscape & water feature" },
  { icon: "/icons/activities.svg", title: "Gym & fitness area" },
];

export default function Facilities() {
  return (
    <div className="relative text-white min-h-screen ">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full left-0 top-0 z-20 w-full mix-blend-multiply"
      >
        <SvgQ2 />
      </motion.div>
      <div className="absolute top-0 right-0 w-2/3 h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
          style={{
            backgroundImage: `url(${encodeURI(
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BENPnPVoctRMk1QleIw1uRj5N5m9mV.png"
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: "path('M0 0H100%V100%H0C100 80 100 20 0 0Z')",
          }}
        />
      </div>

      <MaxWidthWrapper className="relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl pt-16 space-y-12"
        >
          <Header view={false} col />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-6"
          >
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                  <img src={facility.icon || "/placeholder.svg"} alt={facility.title} className="w-6 h-6" />
                </div>
                <p className="text-white text-sm">{facility.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}
