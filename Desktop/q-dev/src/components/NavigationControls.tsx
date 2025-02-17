"use client";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ButtonCustom } from "@/components/ButtonCustom";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, useParams } from "react-router-dom";
//page name
const projectTabs = ["about", "location", "facilities", "masterplan", "videos", "images"];

export function NavigationControls() {
  const navigate = useNavigate();
  const location = useLocation();
  const { placeId, projectId } = useParams();

  // Determine current position in navigation flow
  const getCurrentPosition = () => {
    const path = location.pathname;
    if (path === "/places") return "places";
    if (path === `/${placeId}`) return "placeDetails";
    if (path === `/${placeId}/projects`) return "projects";
    if (path.includes(`/${placeId}/${projectId}`)) {
      const currentTab = projectTabs.find((tab) => path.endsWith(tab));
      return currentTab || ""; // Default to "about" instead of "location"
    }
    return "places";
  };

  const position = getCurrentPosition();
  console.log(position);
  // Navigation logic
  const goNext = () => {
    if (position === "places") {
      navigate(`/${placeId}`);
    } else if (position === "placeDetails") {
      navigate(`/${placeId}/projects`);
    } else if (position === "projects") {
      navigate(`/${placeId}/${projectId}/about`); // Changed to navigate to "about" first
    } else {
      const currentTabIndex = projectTabs.indexOf(position);
      if (currentTabIndex < projectTabs.length - 1) {
        navigate(`/${placeId}/${projectId}/${projectTabs[currentTabIndex + 1]}`);
      }
    }
  };

  const goPrev = () => {
    if (position === "projects") {
      navigate(`/${placeId}`);
    } else if (position === "about") {
      navigate(`/${placeId}/projects`);
    } else if (position === "placeDetails") {
      navigate("/places");
    } else {
      const currentTabIndex = projectTabs.indexOf(position);
      if (currentTabIndex > 0) {
        navigate(`/${placeId}/${projectId}/${projectTabs[currentTabIndex - 1]}`);
      } else {
        navigate(`/${placeId}/projects`);
      }
    }
  };

  const goHome = () => {
    navigate("/places");
  };

  // Determine if buttons should be disabled
  const isNextDisabled = () => {
    if (position === "places" && !placeId) return true;
    if (position === "images") return true;
    return false;
  };

  const isPrevDisabled = () => {
    return position === "places";
  };

  return (
    <MaxWidthWrapper className="z-50 w-full bottom-0 left-28 absolute">
      <div className="special-font flex items-center gap-4 z-50">
        <ButtonCustom
          variant="outline"
          size="lg"
          onClick={goPrev}
          disabled={isPrevDisabled()}
          className="backdrop-blur-sm"
        >
          Prev <ChevronLeft className="h-4 w-4" />
        </ButtonCustom>
        <ButtonCustom
          variant="outline"
          size="lg"
          onClick={goNext}
          disabled={isNextDisabled()}
          className="backdrop-blur-sm hover:text-white bg-main text-main2 font-semibold special-font"
        >
          Next <ChevronRight className="h-4 w-4" />
        </ButtonCustom>
      </div>

      <Button
        onClick={goHome}
        variant="default"
        size="lg"
        className="fixed !px-4 !py-6 cursor-pointer hover:bg-white hover:text-gray-800 bottom-8 right-36 duration-200 rounded-full text-white bg-main2 z-50 backdrop-blur-sm"
      >
        <Home className="h-8 w-8" />
      </Button>
    </MaxWidthWrapper>
  );
}
