import { useState } from "react";
import { ProjectGallery } from "./ProjectGallery";
import { useProjects, type Project } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";

export const InteriorDesignShowcase = () => {
  const { projects: architectureProjects, loading: archLoading } = useProjects({ 
    category: "Architecture", 
    includeAllImages: true 
  });
  const { projects: interiorProjects, loading: intLoading } = useProjects({ 
    category: "Interiors", 
    includeAllImages: true 
  });
  const loading = archLoading || intLoading;
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setGalleryOpen(true);
  };

  return <>
    <section id="interior-design" className="relative py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingState />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Architecture Section - Left */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold mb-6 sm:mb-8 text-foreground tracking-tight">
                  Architecture
                </h2>
                {architectureProjects.length === 0 ? (
                  <EmptyState message="No architecture projects available yet." />
                ) : (
                  architectureProjects.slice(0, 1).map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      aspectRatio="video"
                      onClick={handleProjectClick}
                      titleSize="md"
                    />
                  ))
                )}
              </div>

              {/* Interiors Section - Right */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold mb-6 sm:mb-8 text-foreground tracking-tight">
                  Interiors
                </h2>
                {interiorProjects.length === 0 ? (
                  <EmptyState message="No interior projects available yet." />
                ) : (
                  <div className="flex flex-col gap-6">
                    {interiorProjects.slice(0, 3).map(project => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        aspectRatio="portrait"
                        onClick={handleProjectClick}
                        titleSize="md"
                      />
                    ))}
                  </div>
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