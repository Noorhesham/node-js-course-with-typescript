import { Project } from "@/types";
import Projects from "./ProjectContainer";

const projects: Project[] = [
  {
    id: "north-coast",
    name: "North Coast",
    description: "Luxury beachfront living",
    thumbnail: "/north-coast-thumb.jpg",
    location: {
      coordinates: { lat: 30.123, lng: 31.456 },
      description: "Prime location on the Mediterranean coast",
      mapImage: "/north-coast-map.jpg",
    },
    media: {
      images: ["/nc-1.jpg", "/nc-2.jpg"],
      videos: ["/nc-video.mp4"],
    },
  },
  // Add more projects...
];

export default function ProjectsPage() {
  return <Projects />;
}
