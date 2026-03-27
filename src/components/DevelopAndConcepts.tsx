import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { SupabaseProjectCard } from "@/components/shared/ProjectCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";

export const DevelopAndConcepts = () => {
  const { projects, loading } = useProjects({ categories: ["Development", "Concepts"] });

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold mb-8 sm:mb-12 text-foreground tracking-tight">
            Development & Concepts
          </h2>

          {loading ? (
            <LoadingState />
          ) : projects.length === 0 ? (
            <EmptyState message="No development or concept projects available yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <SupabaseProjectCard
                  key={project.id}
                  project={project}
                  aspectRatio="video"
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
