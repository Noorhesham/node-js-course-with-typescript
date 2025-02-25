import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SvgQ2 from "@/components/SvgQ2";
import { useNav } from "@/context/NavContext";

const Counter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

const Slide1 = () => {
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle("About Us");
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
      <img src="/Rectangle 3.png" className="object-cover w-full absolute inset-0 h-full" alt="" />

      <MaxWidthWrapper className="text-white z-30 relative container mx-auto">
        <div className="max-w-3xl py-32">
          <h1 className="special-font text-6xl text-cream mb-8">Reach to the Beyond</h1>

          <div className="space-y-4 text-cream/80">
            <p>
              Q Developments was established in 2023 to engrave its signature in the Egyptian market for a lifetime by
              introducing quality homes to the Egyptian society in perfectly planned projects that provide integrated
              services.
            </p>
            <p>
              Q Developments strives to provide affordable quality homes, exceptional experience & highest quality
              service to be presented to the Egyptian culture with a good return on investment.
            </p>
            <p>
              A young & dynamic real-estate developer built on the collective efforts and expertise of a team of
              professionals with decades of experience in real-estate, construction, design and property management.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16">
            <div className="text-cream">
              <div className="special-font text-5xl mb-2">
                <Counter value={22} />
              </div>
              <div className="text-sm opacity-80 uppercase leading-tight">OF CURRENT INVESTMENT</div>
            </div>
            <div className="text-cream">
              <div className="special-font text-5xl mb-2">
                <Counter value={260} />
              </div>
              <div className="text-sm opacity-80 uppercase leading-tight">
                LAND BANK IN THE NORTH COAST AND NEW ZAYED
              </div>
            </div>
            <div className="text-cream">
              <div className="special-font text-5xl mb-2">
                <Counter value={12} />
              </div>
              <div className="text-sm opacity-80 uppercase leading-tight">
                OF PLANNED INVESTMENTS IN THE NEAR FUTURE
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide1;
