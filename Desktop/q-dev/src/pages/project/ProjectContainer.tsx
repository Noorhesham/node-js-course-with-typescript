import { Outlet, useLocation } from "react-router-dom";
import { NavigationControls } from "@/components/NavigationControls";
import Start from "@/components/Start";

export default function ProjectLayout() {
  const location = useLocation();

  // Check if the current route matches the "/:placeId/:projectId"
  const isProjectPage = /^\/[^/]+\/[^/]+$/.test(location.pathname);

  return (
    <div className="relative min-h-screen bg-[#003B5C] overflow-hidden">
      {isProjectPage && <Start />} {/* Render Start component only for /placeId/projectId */}
      <Outlet />
      <NavigationControls />
    </div>
  );
}
