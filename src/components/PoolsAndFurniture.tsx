import { useState } from "react";
import { ProjectGallery } from "./ProjectGallery";
import { useProjects, type Project } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";

export const PoolsAndFurniture = () => {
  const { projects: poolProjects, loading: poolLoading } = useProjects({ 
    category: "Pools", 
    includeAllImages: true 
  });
  const { projects: furnitureProjects, loading: furnitureLoading } = useProjects({ 
    category: "Custom Furniture", 
    includeAllImages: true 
  });
  const loading = poolLoading || furnitureLoading;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setGalleryOpen(true);
  };

  return <>
      <section className="relative py-16 sm:py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <LoadingState />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Pools Section - Left (2 columns) */}
                <div className="lg:col-span-2">
                  <h2 className="text-3xl sm:text-4xl font-playfair font-semibold mb-6 text-foreground tracking-tight">
                    Pools
                  </h2>
                  {poolProjects.length === 0 ? (
                    <EmptyState message="No pool projects available yet." />
                  ) : (
                    poolProjects.slice(0, 1).map(project => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        aspectRatio="portrait"
                        onClick={handleProjectClick}
                        titleSize="sm"
                        contentPadding="sm"
                      />
                    ))
                  )}
                </div>

                {/* Custom Furniture Section - Right (3 columns) */}
                <div className="lg:col-span-3">
                  <h2 className="text-3xl sm:text-4xl font-playfair font-semibold mb-6 text-foreground tracking-tight">
                    Custom Furniture
                  </h2>
                  {furnitureProjects.length === 0 ? (
                    <EmptyState message="No custom furniture projects available yet." />
                  ) : (
                    furnitureProjects.slice(0, 1).map(project => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        aspectRatio="video"
                        onClick={handleProjectClick}
                        titleSize="sm"
                        contentPadding="sm"
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedProject && <ProjectGallery open={galleryOpen} onOpenChange={setGalleryOpen} projectTitle={selectedProject.title} images={selectedProject.images || []} />}
    </>;
};
