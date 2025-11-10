import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, getProjectsByCategory, type ProjectCategory } from "@/data/projects";
import { ProjectCardCarousel } from "@/components/ProjectCardCarousel";

type Category = "All" | ProjectCategory;

const categories: Category[] = ["All", "Residential Construction", "Commercial", "Hospitality", "Design Build"];

const categoryColors: Record<string, string> = {
  "Residential Construction": "bg-gold text-charcoal",
  Commercial: "bg-steelBlue text-white",
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
        className="fixed top-6 right-6 z-50 text-charcoal hover:text-gold hover:bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        {/* Back button - shows when category is selected */}
        {selectedCategory !== "All" && (
          <div className="mb-8 opacity-0 animate-fade-in">
            <Button
              onClick={() => setSelectedCategory("All")}
              variant="outline"
              className="bg-white/60 backdrop-blur-sm border-gold/30 text-charcoal hover:bg-white hover:border-gold/50 hover:shadow-md transition-all font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Button>
          </div>
        )}

        {/* Header with enhanced styling */}
        <div className="mb-16 text-center opacity-0 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          </div>
          <h2 className="font-playfair text-6xl md:text-7xl font-bold text-charcoal mb-6 tracking-tight">
            Portfolio
          </h2>
          <p className="font-inter text-charcoal/70 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            A curated collection of exceptional spaces crafted with precision and artistry
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </div>

        {/* Enhanced category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-20 opacity-0 animate-fade-in delay-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group relative font-inter px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all duration-500 overflow-hidden ${
                selectedCategory === category
                  ? 'bg-gold text-charcoal shadow-2xl scale-110'
                  : 'bg-white/80 backdrop-blur-sm text-charcoal hover:bg-white hover:shadow-xl hover:scale-105 border border-gold/20'
              }`}
            >
              {/* Animated background gradient for active state */}
              {selectedCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold/90 to-gold animate-pulse -z-10" />
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                {category}
                <span className={`text-xs font-normal transition-opacity duration-300 ${
                  selectedCategory === category ? 'opacity-70' : 'opacity-50 group-hover:opacity-70'
                }`}>
                  ({getCategoryCount(category)})
                </span>
              </span>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </button>
          ))}
        </div>

        {/* Projects grid with enhanced spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
        <div className="mt-24 text-center opacity-0 animate-fade-in delay-[800ms]">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto" />
        </div>
      </div>
    </div>
  );
};
