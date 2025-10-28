import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const backgroundImage = project.images[0];
  const galleryImages = project.images.slice(1);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full-screen background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Dark gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/30" />

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back button */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="bg-cream/10 backdrop-blur-md border-cream/20 text-cream hover:bg-cream/20 transition-colors"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Portfolio
          </Button>
        </div>

        {/* Project info */}
        <div className="px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center max-w-2xl">
          <span className="text-xs sm:text-sm text-cream/80 font-light tracking-wide uppercase mb-2">
            {project.category}
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream mb-4 md:mb-6">
            {project.title}
          </h1>
          <p className="font-inter text-base md:text-lg text-cream/90 font-light leading-relaxed mb-2">
            {project.description}
          </p>
          <p className="font-inter text-sm text-cream/70 font-light">
            {project.location}
          </p>
        </div>

        {/* Floating scrollable grid */}
        {galleryImages.length > 0 && (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="backdrop-blur-md bg-cream/90 rounded-2xl p-6 shadow-2xl max-w-6xl mx-auto">
              <ScrollArea className="h-[50vh] pr-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer transition-transform hover:scale-105"
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
