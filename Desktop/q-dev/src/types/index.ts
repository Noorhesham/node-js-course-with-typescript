export interface ProjectMedia {
  images?: string[];
  videos?: string[];
  masterPlan?: {
    images: string[];
    description: string;
  };
}

export interface ProjectLocation {
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  mapImage: string;
}

export interface ProjectFacilities {
  list: string[];
  images: string[];
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  location?: ProjectLocation;
  facilities?: ProjectFacilities;
  masterPlan?: ProjectMedia["masterPlan"];
  media?: ProjectMedia;
}

export type ProjectSection = "about" | "location" | "facilities" | "masterPlan" | "videos" | "images";
