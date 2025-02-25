import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import SvgQ2 from "@/components/SvgQ2";
import { motion } from "framer-motion";

export default function About() {
  // Animation variants for staggered text reveal
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  // Split paragraph into sentences for staggered animation
  const paragraphContent =
    "Q Developments was established in 2022 to engrave its signature in the Egyptian market for a lifetime by " +
    "introducing quality homes to the Egyptian society in perfectly planned projects that provide integrated " +
    "services. Q Developments strives to provide affordable quality homes, exceptional experience & highest " +
    "quality service to be presented to the Egyptian culture with a good return on investment. A young & dynamic " +
    "real-estate developer built on the collective efforts and expertise of a team of professionals with decades " +
    "of experience in real-estate, construction, design and property management.";

  const sentences = paragraphContent.split(". ").map((sentence) => sentence.trim() + ".");

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background SVG animation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-0 top-0 z-20 w-full mix-blend-multiply"
      >
        <SvgQ2 />
      </motion.div>

      {/* Background image with subtle parallax effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img src="/Rectangle 3 (4).png" alt="Background Pattern" className="object-cover w-full h-full bg-fixed" />
      </motion.div>

      <MaxWidthWrapper className="text-white z-30 relative container mx-auto">
        <div className="pt-32 flex max-w-2xl flex-col gap-5 items-start">
          {/* Logo reveal animation */}
          <motion.img
            initial={{ x: "100%", opacity: 0, rotate: -5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            layoutId="shared-logo"
            src="/logo3.png"
            className="w-80"
            alt="Q Developments Logo"
          />

          {/* Heading with letter reveal effect */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h2
              className="special-font text-5xl text-cream text-left"
              initial={{ letterSpacing: "0.5em", opacity: 0 }}
              animate={{ letterSpacing: "normal", opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              Our Achievements
            </motion.h2>
          </motion.div>

          {/* Staggered paragraph reveal */}
          <div className="space-y-4">
            {sentences.map((sentence, index) => (
              <motion.p
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="leading-relaxed"
              >
                {sentence}
              </motion.p>
            ))}
          </div>

          {/* Animated underline accent */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="h-px bg-cream mt-8 w-full"
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
