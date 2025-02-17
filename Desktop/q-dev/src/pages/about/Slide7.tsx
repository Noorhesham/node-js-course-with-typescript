"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

const Slide7 = () => {
  const certificates = [
    {
      title: "ISO 14001",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5ko7OhZDfiiRuiSkp4rOAnVKPQsMhX.png",
      description: "Management System Certificate",
    },
    {
      title: "Quality Management System",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5ko7OhZDfiiRuiSkp4rOAnVKPQsMhX.png",
      description: "Certificate of Compliance",
    },
    {
      title: "ISO 9001",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5ko7OhZDfiiRuiSkp4rOAnVKPQsMhX.png",
      description: "QMS Registered",
    },
    {
      title: "CSM Certificate",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5ko7OhZDfiiRuiSkp4rOAnVKPQsMhX.png",
      description: "Quality Management System",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#003B5C] overflow-hidden">
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
