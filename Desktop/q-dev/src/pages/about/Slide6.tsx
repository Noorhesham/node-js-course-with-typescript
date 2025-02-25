import { motion } from "framer-motion";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SvgQ2 from "@/components/SvgQ2";
import { useEffect } from "react";
import { useNav } from "@/context/NavContext";

const Slide6 = () => {
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle("Our Partener");
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full left-0 top-0 z-20 w-full mix-blend-multiply"
      >
        <SvgQ2 />
      </motion.div>
      <div className="absolute inset-0 ">
        <img src="/Rectangle 3 (4).png" alt="Background Pattern" className="object-cover bg-fixed" />
      </div>
      <MaxWidthWrapper className="text-white z-30 relative container mx-auto">
        <div className="py-32 flex max-w-2xl flex-col gap-5 items-start">
          <img src="/logo3.png" className=" w-80" alt="" />
          <h2 className="special-font text-5xl text-cream mb-12 text-center">Our Achievements</h2>
          <p>
            Q Developments was established in 2022 to engrave its signature in the Egyptian market for a lifetime by
            introducing quality homes to the Egyptian society in perfectly planned projects that provide integrated
            services. Q Developments strives to provide affordable quality homes, exceptional experience & highest
            quality service to be presented to the Egyptian culture with a good return on investment. A young & dynamic
            real-estate developer built on the collective efforts and expertise of a team of professionals with decades
            of experience in real-estate, construction, design and property management.
          </p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide6;
