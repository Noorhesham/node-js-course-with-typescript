import { Outlet } from "react-router-dom";
import { NavigationControls } from "@/components/NavigationControls";
import { AnimatePresence } from "framer-motion";

export default function ProjectTabs() {
  return (
    <div className="relative min-h-screen bg-[#003B5C] overflow-hidden">
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      <NavigationControls />
    </div>
  );
}
