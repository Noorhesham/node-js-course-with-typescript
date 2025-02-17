import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";

export default function PlaceDetail() {
  return (
    <div className="relative  min-h-screen bg-[#003B5C] overflow-hidden">
      <MaxWidthWrapper className="relative  text-white  z-10">
        <div className="flex flex-col gap-12 mt-20">
          <Header />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative w-full aspect-[2.5/1] h-80 rounded-[32px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#003B5C]">
              <img src="/Group.png" alt="North Coast Map" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
