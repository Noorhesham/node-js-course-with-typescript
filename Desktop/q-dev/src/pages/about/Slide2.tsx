"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import ItemCardGrid from "@/components/ItemCardGrid";
import { useEffect } from "react";
import { useNav } from "@/context/NavContext";

const Slide2 = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle("Mission , Vision & Values");
  }, []);
  return (
    <div className="relative min-h-screen bg-[#003B5C] overflow-hidden">
      {/* Background Wave Pattern */}
      <div className="absolute inset-0 opacity-30">
        <img src="/Rectangle 3 (1).png" alt="Background Pattern" className="object-cover bg-fixed" />
      </div>

      <MaxWidthWrapper className="relative pt-20 z-10">
        <motion.div className=" flex flex-col gap-1" variants={container} initial="hidden" animate="show">
          {/* Vision Section */}
          <ItemCardGrid
            reverse
            item={item}
            desc="To become The Leading Innovator Brand in the Accessible Intermediate Luxury Real Estate category in the region. Q Developments’ vision to be 'reaching the beyond' is not just a phrase we use on marketing literature. It defines our company culture. It's an ambition, something we strive towards. How we achieve this ambition is very important."
            image="/Rectangle 13.png"
            title="Our Vision"
          />

          {/* Mission Section */}
          <ItemCardGrid
            item={item}
            desc="To build real homes around the best locations, and serve them with modern design. We create the best value within the Accessible Intermediate Luxury Category, mastering the delicate balance between: Excellent Customer Service and Experience - Continuous Innovations - Effective Quality - Optimal Price."
            image="/Rectangle 14.png"
            title="Our Mission"
          />

          {/* Values Section */}
          <ItemCardGrid
            reverse
            item={item}
            desc="OUR VALUES help us achieve our vision in an ethical and consistent way. These values apply to every aspect of our work. When you represent our Company, you work with these values in mind. They support our strategic objectives and underpin the day-to-day activities of our business."
            image="/Rectangle 15.png"
            title="Our Values"
          />
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide2;
