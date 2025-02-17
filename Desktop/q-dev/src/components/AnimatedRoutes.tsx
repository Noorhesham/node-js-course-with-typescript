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
import Videos from "@/pages/project/Videos";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import ProjectTabs from "@/pages/project/Tabs";
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
        <Route path="/:placeId/:projectId" element={<ProjectTabs />}>
          <Route path="" element={<Start />} /> {/* This will be rendered by ProjectLayout */}
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
