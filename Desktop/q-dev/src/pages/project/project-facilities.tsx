"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SvgQ2 from "@/components/SvgQ2";
import Header from "@/components/Header";

const facilities = [
  { icon: "/icon1.svg", title: "3 Swimming pools" },
  { icon: "/icon1.svg", title: "Private beach" },
  { icon: "/icon2.svg", title: "Club house" },
  { icon: "/icon3.svg", title: "Hotel" },
  { icon: "/icon4.svg", title: "Commercial area & strip mall" },
  { icon: "/icon5.svg", title: "Crystal lagoon" },
  { icon: "/icon1.svg", title: "Landscape & water feature" },
  { icon: "/icon1.svg", title: "Gym & fitness area" },
];

export default function Facilities() {
  return (
    <div className="relative text-white min-h-screen ">
      {" "}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full left-0 top-0 z-20 w-full mix-blend-multiply"
      >
        <SvgQ2 />
      </motion.div>
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full left-0 top-0 z-20 w-full mix-blend-multiply"
      >
        <SvgQ2 />
      </motion.div>{" "}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img src="/Rectangle 3 (4).png" alt="Background Pattern" className="object-cover w-full h-full bg-fixed" />
      </motion.div>
      <MaxWidthWrapper className="relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl pt-20 flex flex-col gap-6"
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
