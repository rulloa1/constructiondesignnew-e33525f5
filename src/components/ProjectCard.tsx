import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageWithWatermark } from "@/components/ImageWithWatermark";
import { PremiumImage } from "@/components/PremiumImage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    subtitle?: string;
    category: string;
    location?: string;
    images: string[];
  };
  categoryColor?: string;
  index: number;
  aspectClassName?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, categoryColor, index, aspectClassName }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    elementRef,
    isVisible
  } = useScrollAnimation({
    threshold: 0.1
  });

  const coverImage = project.images[0];

  // Check if the project is a pool project
  const isPoolProject = project.category === "Pools" || project.id === "hospitality-pool";

  // Format category with bullet separator
  const formattedCategory = project.category
    .replace(" ", " • ")
    .replace("/", " • ");

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <Link
        to={`/projects/${project.id}`}
        className="block"
      >
        {/* Image Container */}
        <div className={`relative ${aspectClassName || 'aspect-[4/3]'} overflow-hidden mb-5 bg-muted transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/10 ${isPoolProject ? 'sunset-glow' : ''}`}>
          <ImageWithWatermark>
            <PremiumImage
              src={coverImage}
              alt={project.title}
              aspectRatio="h-full w-full"
              priority={index < 2}
              layoutId={`project-image-${project.id}`}
            />
          </ImageWithWatermark>

          {/* Category Badge - Bottom Left */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="bg-background/90 text-foreground px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest backdrop-blur-md border border-white/10 shadow-sm">
              {formattedCategory}
            </span>
          </div>
        </div>

        {/* Project Info - Title, Subtitle, Location */}
        <div className="space-y-1">
          <h3 className="text-xl text-foreground group-hover:text-gold transition-colors duration-300">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="font-inter text-sm uppercase tracking-wide text-foreground/80">
              {project.subtitle}
            </p>
          )}
          {project.location && (
            <p className="font-inter text-xs text-muted-foreground mt-1">
              {project.location}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
