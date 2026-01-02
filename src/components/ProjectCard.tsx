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
  const secondImage = project.images[1] || coverImage;

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <Link
        to={`/projects/${project.id}`}
        className="block hover-lift-premium rounded-none overflow-hidden"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-muted shadow-elegant group-hover:shadow-luxury transition-all duration-500">
          <ImageWithWatermark>
            {/* Primary Image */}
            <ProgressiveImage
              src={coverImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-700 ease-in-out"
            />
            {/* Secondary Image (Hover) */}
            <ProgressiveImage
              src={secondImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out scale-105 group-hover:scale-110 transition-transform duration-1000"
            />
          </ImageWithWatermark>

          {/* Elegant overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="font-playfair text-white text-sm uppercase tracking-[0.3em] border-b border-white/40 pb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              View Project
            </span>
          </div>

          {/* Category Badge - Bottom Left */}
          <div className="absolute bottom-4 left-4 z-10 transition-opacity duration-300 group-hover:opacity-0">
            <span className="glass-dark text-white/95 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] border border-gold/30 shadow-elegant">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Info - Title, Location */}
        <div className="space-y-2 px-1 text-center">
          <h3 className="font-playfair text-xl lg:text-2xl font-semibold tracking-tight text-charcoal group-hover:text-gold transition-colors duration-300">
            {project.title}
          </h3>
          {project.location && (
            <p className="font-inter text-xs font-light text-charcoal/40 uppercase tracking-[0.2em] mt-1.5">
              {project.location}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
