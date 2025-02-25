import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import AnimatedSvgQ from "@/components/SvgQ";

const places = [
  {
    id: "north-coast",
    name: "North Coast",
    image:'/place1.png',
  },
  {
    id: "alexandria",
    name: "Alexandria",
    image:'/place1.png',
  },
  {
    id: "new-zayed",
    name: "New Zayed",
    image:'/place2.png',
  },
];

export default function Places() {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#003B5C] overflow-hidden">
      <div className=" mix-blend-multiply absolute left-0 top-0 z-10 w-96">
        <AnimatedSvgQ />
      </div>
      <MaxWidthWrapper className="  relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {places.map((place, index) => (
            <Link to={`/${place.id}`} key={place.id}>
              <motion.div
                className="group relative aspect-square  z-[99] rounded-[32px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0  " />
                <div className=" flex items-stretch  absolute bottom-6 left-0">
                  <img src="/q.png" className=" h-12" alt="" />
                  <h2 className="text-2xl bg-main2 h-full  px-10 py-2 rounded-r-2xl text-white font-semibold">
                    {place.name}
                  </h2>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
