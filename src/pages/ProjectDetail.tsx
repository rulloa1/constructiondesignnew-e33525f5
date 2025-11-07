import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
const ProjectDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowLeft" && project) {
        setSelectedImageIndex(prev => prev === 0 ? project.images.length - 1 : (prev ?? 0) - 1);
      } else if (e.key === "ArrowRight" && project) {
        setSelectedImageIndex(prev => prev === project.images.length - 1 ? 0 : (prev ?? 0) + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, project]);
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
              <div className="mb-3">
                <span className="text-xs text-charcoal/60 font-light tracking-widest uppercase">
                  {project.category}
                </span>
                <div className="w-10 h-px bg-charcoal/20 mt-2"></div>
              </div>
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-3 md:mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="font-inter text-sm text-charcoal/50 font-light tracking-wide">
                {project.location}
              </p>
            </div>
          </div>

          {/* Horizontal scrolling gallery */}
          <div className="pt-6 pb-12 px-4 sm:px-6 lg:px-8">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-4 pb-4">
                {project.images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImageIndex(index)}
                    className="relative inline-block h-[60vh] min-h-[400px] w-auto overflow-hidden rounded-lg bg-white border border-charcoal/10 group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-charcoal/30 flex-shrink-0"
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} - Image ${index + 1}`} 
                      className="h-full w-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
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
            {selectedImageIndex + 1} / {project.images.length}
          </div>

          {/* Previous button */}
          <button onClick={e => {
        e.stopPropagation();
        setSelectedImageIndex(selectedImageIndex === 0 ? project.images.length - 1 : selectedImageIndex - 1);
      }} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-charcoal/10 hover:bg-charcoal/20 text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal/30" aria-label="Previous image">
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Next button */}
          <button onClick={e => {
        e.stopPropagation();
        setSelectedImageIndex(selectedImageIndex === project.images.length - 1 ? 0 : selectedImageIndex + 1);
      }} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-charcoal/10 hover:bg-charcoal/20 text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal/30" aria-label="Next image">
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image */}
          <div className="flex items-center justify-center h-full p-16" onClick={e => e.stopPropagation()}>
            <img src={project.images[selectedImageIndex]} alt={`${project.title} - Image ${selectedImageIndex + 1}`} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-in border border-charcoal/10" />
          </div>
        </div>}
    </>;
};
export default ProjectDetail;