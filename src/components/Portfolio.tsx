import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const categories = ["All", "Residential", "Commercial", "Hospitality", "Design Build"];

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const filteredProjects = selectedCategory === "All" ? projects : projects.filter(p => p.category === selectedCategory);
  
  const getCategoryCount = (category: string) => {
    if (category === "All") return projects.length;
    return projects.filter(p => p.category === category).length;
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header and Category tabs */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-8 text-foreground">
            Featured Projects
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
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
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Project image */}
              <div className="aspect-[4/5] overflow-hidden bg-muted rounded-lg mb-4 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                  loading="lazy"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500" />
              </div>

              {/* Project info below image */}
              <div className="space-y-2">
                <h3 className="font-playfair text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="text-sm font-inter text-muted-foreground font-light tracking-wide transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1">
                  {project.location}
                </p>
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
    </section>
  );
};
