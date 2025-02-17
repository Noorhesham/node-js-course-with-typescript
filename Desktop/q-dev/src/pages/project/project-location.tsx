"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

const locations = [
  { time: "10", label: "MIN" },
  { time: "25", label: "MIN" },
  { time: "05", label: "MIN" },
  { time: "20", label: "MIN" },
];

export default function Location() {
  return (
    <div className="relative min-h-screen bg-[#003B5C]">
      <MaxWidthWrapper className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
          <div className="flex items-center justify-between">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              src="/q-logo.svg"
              alt="Q Developments"
              className="h-8"
            />
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-white"
            >
              Q North Location
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-4 gap-6"
          >
            {locations.map((loc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-white">{loc.time}</div>
                <div className="text-sm text-white/70">{loc.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative  w-full h-96 rounded-3xl overflow-hidden"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O17ov5FBnIoAvTkrNzbQNyv9xj2DtG.png"
              alt="Location Map"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
}
