import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, getProjectsByCategory, type ProjectCategory } from "@/data/projects";

type Category = "All" | ProjectCategory;

const categories: Category[] = ["All", "Residential", "Commercial", "Hospitality", "Design Build"];

const categoryColors: Record<string, string> = {
  Residential: "bg-gold text-charcoal",
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
      className={`fixed inset-0 z-40 bg-cream overflow-y-auto transition-opacity duration-600 ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      {/* Close button */}
      <Button
        onClick={handleClose}
        variant="ghost"
        size="icon"
        className="fixed top-6 right-6 z-50 text-charcoal hover:text-gold hover:bg-gold/10 transition-all duration-300"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        {/* Header */}
        <div className="mb-12 text-center opacity-0 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-semibold text-charcoal mb-4">
            Portfolio
          </h2>
          <p className="font-inter text-muted-foreground text-lg font-light">
            A curated collection of exceptional spaces
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 opacity-0 animate-fade-in delay-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`font-inter px-6 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gold text-charcoal shadow-lg scale-105'
                  : 'bg-white text-charcoal hover:bg-gold/10 border border-gold/20'
              }`}
            >
              {category}
              <span className="ml-2 text-xs opacity-70">
                ({getCategoryCount(category)})
              </span>
            </button>
          ))}
        </div>


        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={`group cursor-pointer opacity-0 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-charcoal hover-lift">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.location}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Overlay content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500">
                  <span className={`inline-block w-fit px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium mb-3 transition-colors duration-300 ${
                    categoryColors[project.category]
                  }`}>
                    {project.category}
                  </span>
                  <h3 className="font-playfair text-2xl font-semibold text-cream group-hover:text-gold mb-2 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-inter text-sm text-cream/80 group-hover:text-cream font-light transition-colors duration-300">
                    {project.location}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
