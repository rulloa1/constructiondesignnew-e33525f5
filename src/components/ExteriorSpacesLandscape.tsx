import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";

export const ExteriorSpacesLandscape = () => {
  const { projects, loading } = useProjects({ category: "Pools" });

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 sm:mb-6 text-foreground tracking-tight">
              Pools & Water Features
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl font-inter font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Custom pool designs and luxurious outdoor water features that enhance your living space
            </p>
          </div>

          {loading ? (
            <LoadingState />
          ) : projects.length === 0 ? (
            <EmptyState message="No pool projects available yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  aspectRatio="video"
                  showOverlay
                  titleSize="md"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
