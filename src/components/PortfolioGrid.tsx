import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, getProjectsByCategory, type ProjectCategory } from "@/data/projects";
import { ProjectCardCarousel } from "@/components/ProjectCardCarousel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Category = "All" | ProjectCategory;

const categories: Category[] = ["All", "Residential Construction", "Residential Development", "Civil", "Hospitality", "Design Build"];

const categoryColors: Record<string, string> = {
  "Residential Construction": "bg-gold text-charcoal",
  "Residential Development": "bg-steelBlue text-white",
  Civil: "bg-steelBlue text-white",
  Hospitality: "bg-burgundy text-white",
  "Design Build": "bg-gold text-charcoal",
};

interface PortfolioGridProps {
  onClose: () => void;
  initialCategory?: string;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onClose, initialCategory = "All" }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory as Category);
  const [isClosing, setIsClosing] = useState(false);

  const {
    elementRef: headingRef,
    isVisible: headingVisible
  } = useScrollAnimation({
    threshold: 0.3
  });

  const filteredProjects = getProjectsByCategory(selectedCategory);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const getCategoryCount = (category: Category) => {
    if (category === "All") return projects.length;
    return getProjectsByCategory(category).length;
  };

  return (
    <div 
      className={`fixed inset-0 z-40 overflow-y-auto transition-all duration-700 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-cream via-cream to-gold/5 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(218,165,32,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,69,19,0.05),transparent_50%)]" />
      </div>

      {/* Subtle pattern overlay */}
      <div 
        className="fixed inset-0 opacity-[0.02] -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Close button */}
      <Button
        onClick={handleClose}
        variant="ghost"
        size="icon"
        className="fixed top-4 md:top-6 right-4 md:right-6 z-50 h-10 w-10 md:h-11 md:w-11 text-charcoal hover:text-gold hover:bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
      >
        <X className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-20 lg:py-24">
        {/* Back button - shows when category is selected */}
        {selectedCategory !== "All" && (
          <div className="mb-10 md:mb-12 opacity-0 animate-fade-in">
            <Button
              onClick={() => setSelectedCategory("All")}
              variant="outline"
              className="bg-white/70 backdrop-blur-sm border-gold/25 text-charcoal hover:bg-white hover:border-gold/40 hover:shadow-md transition-all duration-300 font-medium text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Button>
          </div>
        )}

        {/* Header with enhanced styling */}
        <div 
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`mb-20 text-center transition-all duration-1000 ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
          </div>
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal mb-5 tracking-tight">
            Portfolio
          </h2>
          <p className="font-inter text-charcoal/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            A curated collection of exceptional spaces crafted with precision and artistry
          </p>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
        </div>

        {/* Enhanced category filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-24 opacity-0 animate-fade-in delay-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group relative font-inter px-6 md:px-8 py-3 md:py-3.5 rounded-full text-xs md:text-sm uppercase tracking-wider font-semibold transition-all duration-300 overflow-hidden ${
                selectedCategory === category
                  ? 'bg-gold text-charcoal shadow-lg scale-105'
                  : 'bg-white/90 backdrop-blur-sm text-charcoal/80 hover:bg-white hover:text-charcoal hover:shadow-md hover:scale-102 border border-gold/15 hover:border-gold/30'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold">{category}</span>
                <span className={`text-[10px] md:text-xs font-normal transition-opacity duration-300 ${
                  selectedCategory === category ? 'opacity-80' : 'opacity-60 group-hover:opacity-80'
                }`}>
                  ({getCategoryCount(category)})
                </span>
              </span>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/15 to-gold/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </button>
          ))}
        </div>

        {/* Projects grid with enhanced spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCardCarousel
              key={project.id}
              project={project}
              categoryColor={categoryColors[project.category]}
              index={index}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-28 mb-12 text-center opacity-0 animate-fade-in delay-[800ms]">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto" />
        </div>
      </div>
    </div>
  );
};
