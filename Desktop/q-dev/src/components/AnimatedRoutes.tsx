import App from "@/App";
import AboutUs from "@/pages/about/AboutUs";
import Places from "@/pages/places/Place";
import PlaceDetail from "@/pages/places/PlacesDetails";
import ProjectsPage from "@/pages/project/Project";
import Facilities from "@/pages/project/project-facilities";
import Location from "@/pages/project/project-location";
import MasterPlan from "@/pages/project/project-masterplan";
import Images from "@/pages/project/project-media";
import About from "@/pages/project/project-overview";
import ProjectLayout from "@/pages/project/ProjectContainer";
import Videos from "@/pages/project/Videos";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Start from "./Start";

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/*" element={<App />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/places" element={<Places />} />
        <Route path="/:placeId" element={<PlaceDetail />} />
        <Route path="/:placeId/projects" element={<ProjectsPage />} />{" "}
        <Route path="/:placeId/:projectId" element={<ProjectLayout />}>
          {/* Render Start component only when at /:placeId/:projectId */}
          <Route path="" element={<Start />} />

          {/* Nested routes */}
          <Route path="about" element={<About />} />
          <Route path="location" element={<Location />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="masterplan" element={<MasterPlan />} />
          <Route path="videos" element={<Videos />} />
          <Route path="images" element={<Images />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
