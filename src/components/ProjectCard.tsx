import React from "react";
import { Link } from "react-router-dom";
import { ImageWithWatermark } from "@/components/ImageWithWatermark";
import { ProgressiveImage } from "@/components/ProgressiveImage";
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
  categoryColor: string;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, categoryColor, index }) => {
  const {
    elementRef,
    isVisible
  } = useScrollAnimation({
    threshold: 0.1
  });

  const coverImage = project.images[0];

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
        className="block hover-lift-premium rounded-sm overflow-hidden"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-muted shadow-elegant group-hover:shadow-luxury transition-all duration-500">
          <ImageWithWatermark>
            <ProgressiveImage
              src={coverImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </ImageWithWatermark>

          {/* Elegant overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge - Bottom Left */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="glass-dark text-white/95 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] border border-gold/30 shadow-elegant">
              {formattedCategory}
            </span>
          </div>
        </div>

        {/* Project Info - Title, Subtitle, Location */}
        <div className="space-y-1 px-1">
          <h3 className="font-inter text-base font-normal tracking-wide text-charcoal group-hover:text-gold transition-colors duration-300">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="font-inter text-base font-light text-charcoal/80">
              {project.subtitle}
            </p>
          )}
          {project.location && (
            <p className="font-inter text-sm font-light text-charcoal/50 mt-1.5 tracking-wide">
              {project.location}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
