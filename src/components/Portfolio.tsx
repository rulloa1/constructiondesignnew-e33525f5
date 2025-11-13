import React, { useState } from "react";
import { ArrowLeft, HardHat, Hammer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, ProjectCategory } from "@/data/projects";
import { Link } from "react-router-dom";
import { LiquidBackground } from "@/components/LiquidBackground";
interface PortfolioProps {
  onClose: () => void;
}
const categories = ["All", "Residential Construction", "Residential Development", "Civil", "Hospitality", "Design Build"];
const categoryColors: Record<string, string> = {
  "Residential Construction": "bg-gold text-charcoal",
  "Residential Development": "bg-steelBlue text-cream",
  Civil: "bg-steelBlue text-cream",
  Hospitality: "bg-burgundy text-cream",
  "Design Build": "bg-accent text-charcoal"
};
export const Portfolio: React.FC<PortfolioProps> = ({
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const filteredProjects = selectedCategory === "All" ? projects : projects.filter(p => p.category === selectedCategory);
  const getCategoryCount = (category: string) => {
    if (category === "All") return projects.length;
    return projects.filter(p => p.category === category).length;
  };
  return <div className="min-h-screen bg-background relative">
      {/* Liquid animated background */}
      <LiquidBackground />
      
      {/* Dark gradient overlay for readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-charcoal/80 via-background/90 to-charcoal/85 pointer-events-none" style={{ zIndex: -1 }} />

      <style>{`
        @keyframes luxuryPatternMove {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(80px, 140px) scale(1); }
        }
        
        /* Hard Hat Animations - Bobbing motion */
        @keyframes float-luxury-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; }
          25% { transform: translate(20px, -30px) rotate(5deg) scale(1.05); opacity: 0.25; }
          50% { transform: translate(40px, -10px) rotate(-5deg) scale(1.1); opacity: 0.3; }
          75% { transform: translate(20px, 20px) rotate(3deg) scale(0.95); opacity: 0.22; }
        }
        
        /* Hammer Animations - Swinging motion */
        @keyframes float-luxury-1 {
          0%, 100% { transform: translate(0, 0) rotate(-15deg) scale(1); opacity: 0.18; }
          20% { transform: translate(-25px, 30px) rotate(-35deg) scale(1.08); opacity: 0.25; }
          40% { transform: translate(-40px, 60px) rotate(-50deg) scale(1.15); opacity: 0.28; }
          60% { transform: translate(-30px, 40px) rotate(-25deg) scale(1.05); opacity: 0.22; }
          80% { transform: translate(-15px, 15px) rotate(-10deg) scale(0.98); opacity: 0.2; }
        }
        
        /* Wrench Animations - Spinning motion */
        @keyframes float-luxury-2 {
          0%, 100% { transform: translate(0, 0) rotate(25deg) scale(1); opacity: 0.15; }
          33% { transform: translate(35px, -40px) rotate(145deg) scale(1.12); opacity: 0.22; }
          66% { transform: translate(50px, 20px) rotate(265deg) scale(1.08); opacity: 0.18; }
        }
        
        /* Gradient Orb Animations */
        @keyframes float-luxury-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(60px, -50px) scale(1.15); opacity: 0.4; }
          66% { transform: translate(-40px, 40px) scale(0.95); opacity: 0.25; }
        }
        @keyframes float-luxury-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          33% { transform: translate(-50px, 50px) scale(0.9); opacity: 0.2; }
          66% { transform: translate(50px, -40px) scale(1.12); opacity: 0.3; }
        }
        @keyframes float-luxury-orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(40px, 60px) scale(1.1); opacity: 0.28; }
        }
        @keyframes luxuryShine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        
      </div>

      {/* Category tabs */}
      <div className="sticky top-[73px] z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-3 sm:px-6 lg:px-12 py-3 sm:py-4">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm font-inter uppercase tracking-wider transition-all duration-300 relative touch-manipulation ${selectedCategory === category ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                <span className="block sm:inline">{category}</span>
                <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs opacity-60">
                  ({getCategoryCount(category)})
                </span>
                {selectedCategory === category && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />}
              </button>)}
          </div>
        </div>
      </div>

      {/* Project grid */}
      <div className="container mx-auto px-3 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => <Link key={project.id} to={`/project/${project.id}`} className="group opacity-0 animate-fade-in-up" style={{
          animationDelay: `${index * 50}ms`
        }}>
              {/* Project image */}
              <div className="aspect-[3/4] overflow-hidden bg-muted rounded-sm mb-3 sm:mb-4 relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75" loading="lazy" />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500">
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-[10px] sm:text-xs font-inter text-white tracking-wider whitespace-nowrap" style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)'
                  }}>
                    {project.category.replace(' ', ' • ')}
                  </div>
                </div>
              </div>

              {/* Project info below image */}
              <div className="space-y-0.5 sm:space-y-1">
                <h3 className="font-playfair text-base sm:text-lg md:text-xl text-foreground transition-colors duration-300 group-hover:text-gold leading-tight">
                  {project.title}
                  {project.subtitle && (
                    <>
                      <br />
                      {project.subtitle}
                    </>
                  )}
                 </h3>
                {project.additionalInfo && (
                  <p className="text-xs sm:text-sm font-inter text-muted-foreground font-light tracking-wide transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1">
                    {project.additionalInfo}
                  </p>
                )}
              </div>
            </Link>)}
        </div>

        {filteredProjects.length === 0 && <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No projects found in this category.
            </p>
          </div>}
      </div>

      {/* Footer */}
      
    </div>;
};