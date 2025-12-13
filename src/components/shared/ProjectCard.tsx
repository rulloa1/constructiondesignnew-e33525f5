import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/hooks/useProjects";

interface ProjectCardProps {
  project: Project;
  aspectRatio?: "square" | "video" | "portrait";
  showOverlay?: boolean;
  onClick?: (project: Project) => void;
  titleSize?: "sm" | "md" | "lg";
  contentPadding?: "sm" | "md";
}

/**
 * Reusable project card component with consistent styling
 * Supports different aspect ratios and interactive overlays
 */
export const ProjectCard = ({
  project,
  aspectRatio = "video",
  showOverlay = false,
  onClick,
  titleSize = "md",
  contentPadding = "md",
}: ProjectCardProps) => {
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
  };

  const titleSizeClasses = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  };

  const contentPaddingClasses = {
    sm: "p-4",
    md: "p-6",
  };

  const titleMarginClasses = {
    sm: "mb-2",
    md: "mb-3",
  };

  const descriptionClasses = {
    sm: "text-sm line-clamp-2",
    md: "text-sm sm:text-base",
  };

  return (
    <Card
      onClick={() => onClick?.(project)}
      className={`group overflow-hidden bg-card border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {project.image_url && (
        <div className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden`}>
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ transform: `rotate(${project.rotation_angle || 0}deg)` }}
          />
          {showOverlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
          {onClick && (
            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-cream text-lg font-inter">View Gallery</span>
            </div>
          )}
        </div>
      )}
      <CardContent className={contentPaddingClasses[contentPadding]}>
        <h3
          className={`${titleSizeClasses[titleSize]} font-playfair font-semibold ${
            titleMarginClasses[contentPadding]
          } text-foreground group-hover:text-accent transition-colors`}
        >
          {project.title}
        </h3>
        {project.description && (
          <p className={`${descriptionClasses[contentPadding]} font-inter font-light text-muted-foreground leading-relaxed`}>
            {project.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
