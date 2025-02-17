import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

export default function PlaceDetail() {
  const { placeId } = useParams();

  return (
    <div className="relative  min-h-screen bg-[#003B5C] overflow-hidden">
      <MaxWidthWrapper className="relative  text-white  z-10">
        <div className="flex flex-col gap-12 mt-20">
          <div className=" flex items-start gap-4 space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl special-font font-special"
            >
              North Coast
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl space-y-4 text-cream/80"
            >
              <p>
                Q Developments was established in 2022 to engrave its signature in the Egyptian market for a lifetime by
                introducing quality homes to the Egyptian society in perfectly planned projects that provide integrated
                services.
              </p>
              <p>
                Q Developments strives to provide affordable quality homes, exceptional experience & highest quality
                service to be presented to the Egyptian culture with a good return on investment.
              </p>{" "}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
              >
                <Link
                  to={`/${placeId}/projects`}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 mr-auto text-white rounded-lg transition-colors"
                >
                  View Projects
                </Link>
              </motion.div>
            </motion.div>
          </div>

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
