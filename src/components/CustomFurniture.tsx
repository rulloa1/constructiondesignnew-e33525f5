import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useProjectsByCategory } from "@/hooks/useProjects";

export const CustomFurniture = () => {
  const { projects, loading } = useProjectsByCategory("Custom Furniture");

  return (
    <section id="custom-furniture" className="relative py-16 sm:py-20 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold mb-4 sm:mb-5 md:mb-6 text-foreground tracking-tight leading-tight">
              Custom Furniture & Millwork
            </h2>
            <p className="text-base sm:text-lg font-inter text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Beyond standard furnishings, we design and craft custom pieces that perfectly integrate with architectural spaces
            </p>
          </div>

          {loading ? (
            <LoadingState />
          ) : projects.length === 0 ? (
            <EmptyState message="No custom furniture projects available yet." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  aspectRatio="square"
                  titleSize="sm"
                  contentPadding="sm"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
