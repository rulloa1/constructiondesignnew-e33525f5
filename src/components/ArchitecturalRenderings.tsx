import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useProjectsByCategory } from "@/hooks/useProjects";

export const ArchitecturalRenderings = () => {
  const { projects, loading } = useProjectsByCategory("Architecture");

  return (
    <section id="renderings" className="relative py-16 sm:py-20 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 sm:mb-6 text-foreground tracking-tight">
              Architectural Renderings
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl font-inter font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Precision-crafted architectural visualizations that bring design concepts to life
            </p>
          </div>

          {loading ? (
            <LoadingState />
          ) : projects.length === 0 ? (
            <EmptyState message="No architectural projects available yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
