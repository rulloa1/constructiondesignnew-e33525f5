// Project imports
import carmel1Cover from "@/assets/projects/carmel-1-cover.jpg";
import carmel2Cover from "@/assets/projects/carmel-2-cover.jpg";
import project1 from "@/assets/projects/2_After.jpg";
import project2 from "@/assets/projects/4_After.jpg";
import project3 from "@/assets/projects/5_After.jpg";
import project4 from "@/assets/projects/IMGP1302.jpg";
import project5 from "@/assets/projects/IMGP1303.jpg";
import project6 from "@/assets/projects/IMGP1305.jpg";

// Pacific Grove Design Build album
import pgCover from "@/assets/projects/pg-12-after.jpg";
import pgBefore1 from "@/assets/projects/pg-1-before.jpg";
import pgBefore2 from "@/assets/projects/pg-2-before.jpg";
import pgBefore3 from "@/assets/projects/pg-3-before.jpg";
import pgAfter1 from "@/assets/projects/pg-4-after.jpg";
import pgAfter2 from "@/assets/projects/pg-5-after.jpg";
import pgAfter3 from "@/assets/projects/pg-6-after.jpg";
import pgAfter4 from "@/assets/projects/pg-7-after.jpg";
import pgAfter5 from "@/assets/projects/pg-8-after.jpg";
import pgAfter6 from "@/assets/projects/pg-9-after.jpg";
import pgAfter7 from "@/assets/projects/pg-10-after.jpg";

export type ProjectCategory = "Residential" | "Commercial" | "Hospitality" | "Design Build";

export interface Project {
  id: string;
  title: string;
  location: string;
  category: ProjectCategory;
  description: string;
  image: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: "pacific-grove-design-build",
    title: "Pacific Grove Design Build",
    location: "Pacific Grove, CA",
    category: "Design Build",
    description: "A comprehensive transformation of a historic property, seamlessly blending traditional craftsman character with modern comfort and functionality. This complete design-build project showcases our expertise in preserving neighborhood heritage while creating contemporary living spaces.",
    image: pgCover,
    images: [
      pgBefore1,
      pgAfter1,
      pgBefore2,
      pgAfter2,
      pgBefore3,
      pgAfter3,
      pgAfter4,
      pgAfter5,
      pgAfter6,
      pgAfter7,
    ],
  },
  {
    id: "carmel-house-1",
    title: "Carmel House #1",
    location: "Carmel, CA",
    category: "Residential",
    description: "An elegant coastal residence featuring custom architectural details and high-end finishes that capture the essence of Carmel's sophisticated charm.",
    image: carmel1Cover,
    images: [carmel1Cover],
  },
  {
    id: "carmel-house-2",
    title: "Carmel House #2",
    location: "Carmel, CA",
    category: "Residential",
    description: "A stunning coastal home showcasing refined craftsmanship and thoughtful design that harmonizes with the natural beauty of the Carmel coastline.",
    image: carmel2Cover,
    images: [carmel2Cover],
  },
  {
    id: "coastal-hillside-restoration",
    title: "Coastal Hillside Restoration",
    location: "Monterey Peninsula, CA",
    category: "Commercial",
    description: "A comprehensive restoration project that revitalizes a hillside property while preserving its architectural integrity and enhancing its connection to the dramatic coastal landscape.",
    image: project3,
    images: [project3],
  },
  {
    id: "commercial-finish-lds-churches",
    title: "Commercial Finish LDS Churches",
    location: "Central California",
    category: "Commercial",
    description: "Specialized commercial finishing work for religious facilities, featuring meticulous attention to detail and high-quality craftsmanship that creates welcoming and inspiring spaces.",
    image: project4,
    images: [project4],
  },
  {
    id: "hillside-cleanup",
    title: "Hillside Cleanup",
    location: "Monterey Peninsula, CA",
    category: "Commercial",
    description: "Comprehensive site preparation and environmental restoration services that transform challenging hillside properties into beautiful, buildable lots.",
    image: project5,
    images: [project5],
  },
  {
    id: "laguna-grande-design-build",
    title: "Laguna Grande Design Build",
    location: "Seaside, CA",
    category: "Residential",
    description: "A complete design-build project that delivers custom solutions from concept through completion, featuring modern amenities and quality construction throughout.",
    image: project6,
    images: [project6],
  },
  {
    id: "southcoast-remodel-design-build",
    title: "Southcoast Remodel Design Build",
    location: "South Coast, CA",
    category: "Residential",
    description: "A comprehensive remodel and design-build project that transforms existing spaces into modern, functional, and aesthetically stunning environments.",
    image: project1,
    images: [project1],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: ProjectCategory | "All"): Project[] => {
  if (category === "All") return projects;
  return projects.filter(project => project.category === category);
};
