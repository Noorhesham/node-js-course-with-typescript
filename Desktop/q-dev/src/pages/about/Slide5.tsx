import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useNav } from "@/context/NavContext";
import { useEffect } from "react";

const Slide5 = () => {
  const values = ["/logo1.png", "/logoo2.png", "/logo3.png", "logo4.svg"];
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle("Our Partener");
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src="/Rectangle 3 (5).png" alt="Background Pattern" className="object-cover z-10 bg-fixed" />
      </div>
      <MaxWidthWrapper className="text-white z-30 relative container mx-auto">
        <div className="py-32">
          <div className="flex flex-col gap-4 my-5">
            <h2 className="special-font text-5xl text-cream  text-center">Our Values</h2>
            <p className=" text-center">
              Q Developments was established in 2022 to engrave its signature in the Egyptian market for a lifetime by
              introducing quality homes to the Egyptian society in perfectly planned projects that provide integrated
              services.{" "}
            </p>
          </div>
          <div className="grid mt-20 grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <img src={value} alt="" />
              </motion.div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide5;
