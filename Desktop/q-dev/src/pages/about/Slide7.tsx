"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useNav } from "@/context/NavContext";
import { useEffect } from "react";

const Slide7 = () => {
  const certificates = [
    {
      title: "ISO 14001",
      image: "/Rectangle 9 (1).png",
      description: "Management System Certificate",
    },
    {
      title: "Quality Management System",
      image: "/Rectangle 11.png",
      description: "Certificate of Compliance",
    },
    {
      title: "ISO 9001",
      image: "/Rectangle 10.png",
      description: "QMS Registered",
    },
    {
      title: "CSM Certificate",
      image: "/Rectangle 11.png",
      description: "Quality Management System",
    },
  ];
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle("Certificates");
  }, []);
  return (
    <div className="relative min-h-screen  overflow-hidden">
      {" "}
      <div className="absolute inset-0 w-full h-full bg-main2 z-20 mix-blend-multiply" />
      <div className=" absolute inset-0 w-full h-full bg-white/30 z-10"></div>
      <video src="/pattern v03.mp4" loop autoPlay muted className="absolute   inset-0 w-full h-full object-cover" />
      <MaxWidthWrapper className="text-white z-30 relative">
        <div className="pt-14 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="special-font text-5xl text-cream mb-6">Certificates</h2>
            <p className="text-cream/80 leading-relaxed">
              Q Developments was established in 2022 to engrave its signature in the Egyptian market for a lifetime by
              introducing quality homes to the Egyptian society in perfectly planned projects that provide integrated
              services.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative aspect-[3/4] bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={cert.image || "/placeholder.svg"} alt={cert.title} className="object-contain p-4" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold mb-1">{cert.title}</h3>
                    <p className="text-sm text-cream/80">{cert.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide7;
