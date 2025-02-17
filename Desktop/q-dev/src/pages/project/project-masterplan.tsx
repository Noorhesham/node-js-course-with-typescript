"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ChevronLeft } from "lucide-react";

export default function MasterPlan() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#003B5C]">
      <MaxWidthWrapper className="relative z-10">
        <AnimatePresence mode="wait">
          {!showDetails ? (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 py-12"
            >
              <div className="flex items-center justify-between">
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src="/q-logo.svg"
                  alt="Q Developments"
                  className="h-8"
                />
                <motion.h1 className="text-2xl text-white">Q North Master Plan</motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-cream/80 leading-relaxed max-w-xl"
              >
                Our goal is to deliver luxury homes with elegant and modern designs that provide comfort and luxury to
                our clients.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="aspect-[2/1] rounded-3xl overflow-hidden cursor-pointer"
                onClick={() => setShowDetails(true)}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lZEwjKBaJp5gNXdT0dzfnEev4bYPvG.png"
                  alt="Master Plan"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 space-y-12"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex items-center gap-2 text-white hover:text-cream/80 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Master Plan
                </button>
                <h1 className="text-2xl text-white">Floor Plans</h1>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h2 className="text-white text-xl">Ground Floor</h2>
                  <div className="aspect-square rounded-3xl overflow-hidden bg-white/10">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lZEwjKBaJp5gNXdT0dzfnEev4bYPvG.png"
                      alt="Ground Floor Plan"
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-white text-xl">First Floor</h2>
                  <div className="aspect-square rounded-3xl overflow-hidden bg-white/10">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lZEwjKBaJp5gNXdT0dzfnEev4bYPvG.png"
                      alt="First Floor Plan"
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="aspect-video rounded-3xl overflow-hidden"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lZEwjKBaJp5gNXdT0dzfnEev4bYPvG.png"
                  alt="Property View"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </MaxWidthWrapper>
    </div>
  );
}
