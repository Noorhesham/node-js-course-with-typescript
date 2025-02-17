// App.tsx
import { motion } from "framer-motion";
import { HomeSlide } from "./slides/HomeSlide";

export default function App() {
  return (
    <motion.main
      className="bg-blue-950"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
    >
      <HomeSlide />
    </motion.main>
  );
}
