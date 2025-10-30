import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects, getInProgressProjects } from "@/data/projects";

const categories = ["All", "In Progress", "Residential", "Commercial", "Hospitality", "Design Build"];

const categoryColors: Record<string, string> = {
  Residential: "bg-gold text-charcoal",
  Commercial: "bg-steelBlue text-cream",
  Hospitality: "bg-burgundy text-cream",
  "Design Build": "bg-accent text-charcoal",
  "In Progress": "bg-construction text-cream",
};

export const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : selectedCategory === "In Progress"
    ? projects.filter(p => p.status === "in-progress")
    : projects.filter(p => p.category === selectedCategory);

  const getCategoryCount = (category: string) => {
    if (category === "All") return projects.length;
    if (category === "In Progress") return getInProgressProjects().length;
    return projects.filter(p => p.category === category).length;
  };

  return (
    <section className="bg-cream pt-40 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-6xl font-semibold text-charcoal mb-6">
            30+ Years of Quality Craftsmanship
          </h2>
          <p className="font-inter text-muted-foreground text-lg md:text-xl font-light max-w-3xl mx-auto">
            From architectural design to landscape restoration, explore our diverse portfolio of projects
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group cursor-pointer opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-charcoal hover-lift">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.location}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* In Progress Badge */}
                {project.status === "in-progress" && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-construction text-cream border-none shadow-lg animate-pulse-subtle flex items-center gap-1.5 px-3 py-1.5">
                      <Construction className="h-3.5 w-3.5" />
                      <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
                    </Badge>
                  </div>
                )}
                
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
