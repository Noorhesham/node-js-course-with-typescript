import React from "react";
import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ShoppingCart, Plane, Building2, GraduationCap } from "lucide-react";
import Header from "@/components/Header";

const locations = [
  {
    time: "10",
    label: "FROM ONE MALL",
    icon: ShoppingCart,
  },
  {
    time: "25",
    label: "FROM CAIRO AIRPORT",
    icon: Plane,
  },
  {
    time: "05",
    label: "FROM FAMILY PARK",
    icon: Building2,
  },
  {
    time: "20",
    label: "FROM FUTURE UNIV.",
    icon: GraduationCap,
  },
];

const Location = () => {
  return (
    <div className=" text-white min-h-screen pt-20 ">
      {" "}
      <div className="mix-blend-multiply bg-main2 absolute left-0 top-0 z-10 w-full h-full"></div>{" "}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <img src="/Rectangle 3 (4).png" alt="Background Pattern" className="object-cover w-full h-full bg-fixed" />
      </motion.div>
      <MaxWidthWrapper className="flex relative z-40 flex-col gap-5">
        <Header view={false} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {locations.map((loc, index) => (
                <div key={index} className="border border-main rounded-lg p-6 hover:border-main/40 transition-colors">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center justify-center text-center"
                  >
                    <loc.icon className="w-8 h-8 mb-4 text-main" />
                    <div className="text-3xl font-bold mb-1 special-font">{loc.time} Min</div>
                    <div className="text-sm text-gray-400">{loc.label}</div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/Frame 48096075.png"
              alt="Q North Location Map"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Location;
