import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProjectVideo {
  id: string;
  video_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
}

interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
  is_before: boolean;
  is_after: boolean;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [videos, setVideos] = useState<ProjectVideo[]>([]);
  const [dbImages, setDbImages] = useState<ProjectImage[]>([]);

  // Fetch videos and images for this project
  useEffect(() => {
    if (!id) return;
    
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from('project_videos')
        .select('*')
        .eq('project_id', id)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setVideos(data);
      }
    };

    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', id)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setDbImages(data);
      }
    };

    fetchVideos();
    fetchImages();
  }, [id]);

  // Combine static images with database images
  const allImages = [...project?.images || [], ...dbImages.map(img => img.image_url)];

  // Helper function to get image label
  const getImageLabel = (imageUrl: string, index: number): string | null => {
    const dbImage = dbImages.find(img => img.image_url === imageUrl);
    if (dbImage?.is_before) return "Before";
    if (dbImage?.is_after) return "After";
    
    const fileName = imageUrl.toLowerCase();
    if (fileName.includes("before")) return "Before";
    if (fileName.includes("after")) return "After";
    return null;
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex(prev => prev === 0 ? allImages.length - 1 : (prev ?? 0) - 1);
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex(prev => prev === allImages.length - 1 ? 0 : (prev ?? 0) + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, allImages.length]);
  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>;
  }
  return <>
      <div className="relative min-h-screen bg-gradient-to-b from-cream/30 via-white to-cream/20">
        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Back button */}
          <div className="p-4 sm:p-6 lg:p-8">
            <Button variant="outline" onClick={() => navigate("/", {
            state: {
              openPortfolio: true
            }
          })} className="bg-white border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-cream shadow-sm hover:shadow-md transition-all font-medium" size="lg">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to All Projects
            </Button>
          </div>

          {/* Project info */}
          <div className="px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-charcoal/10">
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-3 md:mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="font-inter text-sm text-charcoal/50 font-light tracking-wide">
                {project.location}
              </p>
            </div>
          </div>

          {/* Videos Section */}
          {videos.length > 0 && (
            <div className="pt-6 pb-6 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto space-y-6">
                <h2 className="text-2xl font-playfair font-semibold text-charcoal">Project Videos</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {videos.map((video) => (
                    <div key={video.id} className="bg-white rounded-lg overflow-hidden border border-charcoal/10 shadow-md">
                      <video
                        src={video.video_url}
                        controls
                        className="w-full aspect-video bg-black"
                      />
                      {(video.title || video.description) && (
                        <div className="p-4">
                          {video.title && (
                            <h3 className="font-semibold text-charcoal mb-1">{video.title}</h3>
                          )}
                          {video.description && (
                            <p className="text-sm text-charcoal/70">{video.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Simple gallery grid */}
          <div className="pt-6 pb-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ${project.category === "Design Build" ? "gap-1" : "gap-3 md:gap-4"}`}>
                {allImages.map((image, index) => {
                  const label = getImageLabel(image, index);
                  return (
                    <button 
                      key={`${image}-${index}`} 
                      onClick={() => setSelectedImageIndex(index)} 
                      className="relative aspect-square overflow-hidden rounded-lg bg-white border border-charcoal/10 group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-charcoal/30"
                    >
                      <img 
                        src={image} 
                        alt={`${project.title} - Image ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {label && (
                        <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white rounded ${
                          label === "Before" ? "bg-amber-500/90" : "bg-emerald-500/90"
                        }`}>
                          {label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md animate-fade-in" onClick={() => setSelectedImageIndex(null)}>
          {/* Close button */}
          <button onClick={() => setSelectedImageIndex(null)} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-charcoal/10 hover:bg-charcoal/20 text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal/30" aria-label="Close">
            <X className="h-6 w-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-charcoal/10 backdrop-blur-md text-charcoal text-sm font-light border border-charcoal/20">
            {selectedImageIndex + 1} / {allImages.length}
          </div>

          {/* Previous button */}
          <button onClick={e => {
        e.stopPropagation();
        setSelectedImageIndex(selectedImageIndex === 0 ? allImages.length - 1 : selectedImageIndex - 1);
      }} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-charcoal/10 hover:bg-charcoal/20 text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal/30" aria-label="Previous image">
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Next button */}
          <button onClick={e => {
        e.stopPropagation();
        setSelectedImageIndex(selectedImageIndex === allImages.length - 1 ? 0 : selectedImageIndex + 1);
      }} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-charcoal/10 hover:bg-charcoal/20 text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal/30" aria-label="Next image">
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image */}
          <div className="flex items-center justify-center h-full p-16" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={allImages[selectedImageIndex]} 
                alt={`${project.title} - Image ${selectedImageIndex + 1}`} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in border border-charcoal/10" 
              />
              {getImageLabel(allImages[selectedImageIndex], selectedImageIndex) && (
                <span className={`absolute top-4 right-4 px-3 py-2 text-sm font-semibold text-white rounded-lg ${
                  getImageLabel(allImages[selectedImageIndex], selectedImageIndex) === "Before" 
                    ? "bg-amber-500/90" 
                    : "bg-emerald-500/90"
                }`}>
                  {getImageLabel(allImages[selectedImageIndex], selectedImageIndex)}
                </span>
              )}
            </div>
          </div>
        </div>}
    </>;
};
export default ProjectDetail;