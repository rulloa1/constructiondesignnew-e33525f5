import React, { useState, useMemo, useCallback } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, getProjectsByCategory, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";


type Category = "All" | ProjectCategory;

const categories: Category[] = ["All", "Residential Construction", "Residential Development", "Civil", "residential * civil * design/build", "Hospitality", "Design/Build"];

const categoryColors: Record<string, string> = {
  "Residential Construction": "bg-gold text-charcoal",
  "Residential Development": "bg-steelBlue text-white",
  Civil: "bg-steelBlue text-white",
  "residential * civil * design/build": "bg-steelBlue text-white",
  Hospitality: "bg-burgundy text-white",
  "Design/Build": "bg-gold text-charcoal",
};

interface PortfolioGridProps {
  onClose: () => void;
  initialCategory?: string;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = React.memo(({ onClose, initialCategory = "All" }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory as Category);
  const [isClosing, setIsClosing] = useState(false);


  // Memoize filtered projects to prevent recalculation on every render
  const filteredProjects = useMemo(() => {
    return getProjectsByCategory(selectedCategory);
  }, [selectedCategory]);

  // Memoize handleClose to prevent recreation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 600);
  }, [onClose]);

  // Memoize getCategoryCount to prevent recreation
  const getCategoryCount = useCallback((category: Category) => {
    if (category === "All") return projects.length;
    return getProjectsByCategory(category).length;
  }, []);

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

        {/* Hidden heading for accessibility and SEO */}
        <h1 className="sr-only">Portfolio Projects</h1>

        {/* Category filters - tab-style navigation matching original design */}
        <div className="mb-10 md:mb-12 border-b border-charcoal/10">
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10 font-inter text-[10px] md:text-xs tracking-[0.18em] uppercase">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative pb-3 transition-colors duration-200 ${
                    isActive
                      ? "text-gold"
                      : "text-charcoal/40 hover:text-charcoal/70"
                  }`}
                >
                  <span className="whitespace-nowrap font-medium">
                    {category}{" "}
                    <span className="opacity-70">({getCategoryCount(category)})</span>
                  </span>
                  {isActive && (
                    <span className="pointer-events-none absolute inset-x-0 -bottom-[1px] mx-auto h-[2px] w-full max-w-[80px] bg-gold" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Projects grid with enhanced spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
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
});

PortfolioGrid.displayName = 'PortfolioGrid';
