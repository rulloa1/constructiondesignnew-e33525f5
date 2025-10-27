import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, ProjectCategory } from "@/data/projects";
import { Link } from "react-router-dom";

interface PortfolioProps {
  onClose: () => void;
}

const categories = ["All", "Residential", "Commercial", "Hospitality", "Design Build"];

const categoryColors: Record<string, string> = {
  Residential: "bg-gold text-charcoal",
  Commercial: "bg-steelBlue text-cream",
  Hospitality: "bg-burgundy text-cream",
  "Design Build": "bg-accent text-charcoal",
};

export const Portfolio: React.FC<PortfolioProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const getCategoryCount = (category: string) => {
    if (category === "All") return projects.length;
    return projects.filter(p => p.category === category).length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Cover
            </Button>
            
            <h1 className="font-playfair text-2xl md:text-3xl text-foreground">
              Portfolio
            </h1>
            
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-[73px] z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-inter uppercase tracking-wider transition-all duration-300 relative ${
                  selectedCategory === category
                    ? "text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
                <span className="ml-2 text-xs opacity-60">
                  ({getCategoryCount(category)})
                </span>
                {selectedCategory === category && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project grid */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group relative overflow-hidden rounded-sm opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Project image */}
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                  <h3 className="font-playfair text-xl mb-2">{project.title}</h3>
                  <p className="text-sm text-cream/80">{project.location}</p>
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-xs uppercase tracking-wider font-medium rounded-sm ${
                  categoryColors[project.category] || "bg-muted text-foreground"
                }`}>
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-light text-muted-foreground">
              © 2025 Michael Chandler. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm font-light text-muted-foreground hover:text-accent transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/michael-chandler-3858a63a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light text-muted-foreground hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-sm font-light text-muted-foreground hover:text-accent transition-colors"
              >
                Behance
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
