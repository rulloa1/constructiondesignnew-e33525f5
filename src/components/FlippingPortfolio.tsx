import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { projects, ProjectCategory } from "@/data/projects";

interface FlippingPortfolioProps {
  onClose: () => void;
  initialCategory?: ProjectCategory | "All";
}

export const FlippingPortfolio: React.FC<FlippingPortfolioProps> = ({ 
  onClose,
  initialCategory = "All" 
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward">("forward");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">(initialCategory);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const categories: (ProjectCategory | "All")[] = ["All", "Residential", "Commercial", "Hospitality", "Design Build"];

  const totalPages = filteredProjects.length;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlipDirection("forward");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 800);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("backward");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 800);
    }
  };

  const currentProject = filteredProjects[currentPage];

  return (
    <div className="fixed inset-0 bg-charcoal z-50 flex items-center justify-center p-4 md:p-8">
      {/* Close button */}
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-cream hover:text-gold hover:bg-charcoal/50"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Category filters */}
      <div className="absolute top-4 left-4 z-50 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(0);
            }}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className={`text-xs ${
              selectedCategory === category
                ? "bg-gold text-charcoal hover:bg-gold/90"
                : "bg-charcoal/50 text-cream border-gold/30 hover:bg-gold/20"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Book container */}
      <div className="relative w-full max-w-6xl h-[80vh] perspective-[2000px]">
        {/* Left page navigation */}
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 0 || isFlipping}
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-40 text-gold hover:text-gold/80 disabled:opacity-30"
        >
          <ChevronLeft className="h-12 w-12" />
        </Button>

        {/* Right page navigation */}
        <Button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1 || isFlipping}
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-40 text-gold hover:text-gold/80 disabled:opacity-30"
        >
          <ChevronRight className="h-12 w-12" />
        </Button>

      {/* Book spread */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "2500px" }}>
          {/* Book shadow */}
          <div className="absolute inset-0 bg-black/40 blur-3xl scale-95 transition-all duration-800" 
               style={{ 
                 transform: isFlipping 
                   ? `translateX(${flipDirection === "forward" ? "-20px" : "20px"}) scale(0.9)` 
                   : "translateX(0) scale(0.95)" 
               }} />
          
          {/* Book pages */}
          <div className={`relative w-full h-full bg-cream rounded-lg shadow-2xl overflow-hidden ${
            isFlipping && flipDirection === "forward" ? "animate-flip-forward" : ""
          } ${
            isFlipping && flipDirection === "backward" ? "animate-flip-backward" : ""
          }`} style={{ transformStyle: "preserve-3d" }}>
            {/* Page content */}
            {currentProject && (
              <div className="w-full h-full flex">
                {/* Left page - Image */}
                <div className="w-1/2 h-full relative border-r-2 border-charcoal/10">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Page number */}
                  <div className="absolute bottom-8 left-8 font-playfair text-sm text-charcoal/50">
                    {currentPage + 1}
                  </div>
                </div>

                {/* Right page - Content */}
                <div className="w-1/2 h-full p-12 flex flex-col justify-center space-y-6">
                  {/* Category badge */}
                  <div className="inline-block">
                    <span className="px-4 py-2 bg-gold/20 text-gold text-xs font-inter font-medium tracking-wider uppercase rounded">
                      {currentProject.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal">
                    {currentProject.title}
                  </h2>

                  {/* Location */}
                  <p className="font-inter text-lg text-charcoal/70 flex items-center gap-2">
                    <span className="text-gold">📍</span>
                    {currentProject.location}
                  </p>

                  {/* Description */}
                  <p className="font-inter text-base text-charcoal/80 leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Image gallery indicator */}
                  {currentProject.images.length > 1 && (
                    <div className="pt-4">
                      <p className="font-inter text-sm text-charcoal/60">
                        {currentProject.images.length} images in gallery
                      </p>
                    </div>
                  )}

                  {/* Page number */}
                  <div className="absolute bottom-8 right-12 font-playfair text-sm text-charcoal/50">
                    {currentPage + 2}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Page curl effect with lighting */}
          {isFlipping && (
            <>
              <div className={`absolute top-0 ${flipDirection === "forward" ? "right-0" : "left-0"} w-1/2 h-full pointer-events-none transition-opacity duration-300`}>
                <div className={`w-full h-full ${
                  flipDirection === "forward" 
                    ? "bg-gradient-to-l from-black/30 via-black/10 to-transparent" 
                    : "bg-gradient-to-r from-black/30 via-black/10 to-transparent"
                }`} />
              </div>
              <div className={`absolute top-0 ${flipDirection === "forward" ? "left-0" : "right-0"} w-1/2 h-full pointer-events-none transition-opacity duration-300`}>
                <div className={`w-full h-full ${
                  flipDirection === "forward" 
                    ? "bg-gradient-to-r from-white/10 to-transparent" 
                    : "bg-gradient-to-l from-white/10 to-transparent"
                }`} />
              </div>
            </>
          )}
        </div>

        {/* Page counter */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-16 text-cream/70 font-inter text-sm">
          Page {currentPage + 1} of {totalPages}
        </div>
      </div>
    </div>
  );
};
