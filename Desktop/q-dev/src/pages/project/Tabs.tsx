import { Outlet, useLocation, useParams } from "react-router-dom";
import { NavigationControls } from "@/components/NavigationControls";
import { AnimatePresence } from "framer-motion";

export default function ProjectTabs() {
  const location = useLocation();
  const { placeId, projectId } = useParams();

  // Check if the current path is exactly "/:placeId/:projectId"
  const isRootProjectPath = location.pathname === `/${placeId}/${projectId}`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {isRootProjectPath && (
        <>
          {" "}
          <div className="mix-blend-multiply bg-[#003B5C] absolute left-0 top-0 z-10 w-full h-full"></div>
          <img src="/Rectangle 3 (6).png" className="object-cover w-full absolute inset-0 h-full" alt="" />
        </>
      )}

      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>

      <NavigationControls />
    </div>
  );
}
