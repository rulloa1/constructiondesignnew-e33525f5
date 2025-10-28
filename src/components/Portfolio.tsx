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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Construction-themed animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Animated blueprint grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--gold) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--gold) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 60s linear infinite'
        }} />
        
        {/* Floating architectural elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`arch-${i}`}
              className="absolute border border-gold/10"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                left: `${10 + i * 15}%`,
                top: `${5 + i * 10}%`,
                transform: 'rotate(45deg)',
                animation: `float-arch-${i % 3} ${20 + i * 3}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
        </div>

        {/* Floating construction tool silhouettes */}
        <div className="absolute inset-0">
          {/* Hammers */}
          <svg className="absolute opacity-5" width="60" height="60" viewBox="0 0 24 24" fill="hsl(var(--gold))"
            style={{ left: '15%', top: '15%', animation: 'float-tool-1 25s ease-in-out infinite' }}>
            <path d="M20.2 4.4l-.6-.6c-.4-.4-1-.4-1.4 0l-1.4 1.4-1.4-1.4c-.4-.4-1-.4-1.4 0l-.6.6c-.4.4-.4 1 0 1.4l1.4 1.4-8 8c-.4.4-.4 1 0 1.4l2.8 2.8c.4.4 1 .4 1.4 0l8-8 1.4 1.4c.4.4 1 .4 1.4 0l.6-.6c.4-.4.4-1 0-1.4l-1.4-1.4 1.4-1.4c.2-.4.2-1-.2-1.4z"/>
          </svg>
          
          <svg className="absolute opacity-5" width="50" height="50" viewBox="0 0 24 24" fill="hsl(var(--gold))"
            style={{ right: '20%', top: '40%', animation: 'float-tool-2 30s ease-in-out infinite' }}>
            <path d="M20.2 4.4l-.6-.6c-.4-.4-1-.4-1.4 0l-1.4 1.4-1.4-1.4c-.4-.4-1-.4-1.4 0l-.6.6c-.4.4-.4 1 0 1.4l1.4 1.4-8 8c-.4.4-.4 1 0 1.4l2.8 2.8c.4.4 1 .4 1.4 0l8-8 1.4 1.4c.4.4 1 .4 1.4 0l.6-.6c.4-.4.4-1 0-1.4l-1.4-1.4 1.4-1.4c.2-.4.2-1-.2-1.4z"/>
          </svg>

          {/* Hardhats */}
          <svg className="absolute opacity-5" width="55" height="55" viewBox="0 0 24 24" fill="hsl(var(--gold))"
            style={{ left: '70%', top: '25%', animation: 'float-tool-3 28s ease-in-out infinite' }}>
            <path d="M12 2C9.79 2 8 3.79 8 6v5H4v2c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6v-2h-4V6c0-2.21-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2v5h-4V6c0-1.1.9-2 2-2z"/>
          </svg>

          <svg className="absolute opacity-5" width="45" height="45" viewBox="0 0 24 24" fill="hsl(var(--gold))"
            style={{ left: '25%', bottom: '30%', animation: 'float-tool-1 27s ease-in-out infinite reverse' }}>
            <path d="M12 2C9.79 2 8 3.79 8 6v5H4v2c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6v-2h-4V6c0-2.21-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2v5h-4V6c0-1.1.9-2 2-2z"/>
          </svg>

          {/* Ladders */}
          <svg className="absolute opacity-5" width="40" height="70" viewBox="0 0 24 24" fill="hsl(var(--gold))"
            style={{ right: '15%', bottom: '20%', animation: 'float-tool-2 32s ease-in-out infinite' }}>
            <path d="M8 2v20M16 2v20M8 6h8M8 10h8M8 14h8M8 18h8"/>
            <rect x="7" y="2" width="2" height="20" />
            <rect x="15" y="2" width="2" height="20" />
            <rect x="8" y="5" width="8" height="1.5" />
            <rect x="8" y="9" width="8" height="1.5" />
            <rect x="8" y="13" width="8" height="1.5" />
            <rect x="8" y="17" width="8" height="1.5" />
          </svg>

          <svg className="absolute opacity-5" width="35" height="60" viewBox="0 0 24 24" fill="hsl(var(--gold))"
            style={{ left: '50%', top: '60%', animation: 'float-tool-3 29s ease-in-out infinite reverse' }}>
            <rect x="7" y="2" width="2" height="20" />
            <rect x="15" y="2" width="2" height="20" />
            <rect x="8" y="5" width="8" height="1.5" />
            <rect x="8" y="9" width="8" height="1.5" />
            <rect x="8" y="13" width="8" height="1.5" />
            <rect x="8" y="17" width="8" height="1.5" />
          </svg>
        </div>

        {/* Animated construction lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--gold))', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--gold))', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--gold))', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#lineGrad)" strokeWidth="1">
            <animate attributeName="y1" values="20%;80%;20%" dur="25s" repeatCount="indefinite" />
            <animate attributeName="y2" values="20%;80%;20%" dur="25s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="url(#lineGrad)" strokeWidth="1">
            <animate attributeName="y1" values="60%;20%;60%" dur="30s" repeatCount="indefinite" />
            <animate attributeName="y2" values="60%;20%;60%" dur="30s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Subtle gradient orbs */}
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)',
            top: '10%',
            right: '10%',
            animation: 'float-orb-1 30s ease-in-out infinite'
          }}
        />
        <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, hsl(var(--steelBlue)) 0%, transparent 70%)',
            bottom: '20%',
            left: '15%',
            animation: 'float-orb-2 35s ease-in-out infinite reverse'
          }}
        />
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes float-arch-0 {
          0%, 100% { transform: translate(0, 0) rotate(45deg); opacity: 0.1; }
          33% { transform: translate(20px, -30px) rotate(50deg); opacity: 0.2; }
          66% { transform: translate(-15px, 20px) rotate(40deg); opacity: 0.15; }
        }
        @keyframes float-arch-1 {
          0%, 100% { transform: translate(0, 0) rotate(45deg); opacity: 0.1; }
          33% { transform: translate(-25px, 25px) rotate(35deg); opacity: 0.15; }
          66% { transform: translate(20px, -15px) rotate(55deg); opacity: 0.2; }
        }
        @keyframes float-arch-2 {
          0%, 100% { transform: translate(0, 0) rotate(45deg); opacity: 0.1; }
          50% { transform: translate(15px, 30px) rotate(48deg); opacity: 0.18; }
        }
        @keyframes float-tool-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -20px) rotate(5deg); }
          50% { transform: translate(50px, 10px) rotate(-5deg); }
          75% { transform: translate(20px, 30px) rotate(3deg); }
        }
        @keyframes float-tool-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-40px, 30px) rotate(-8deg); }
          66% { transform: translate(25px, -25px) rotate(8deg); }
        }
        @keyframes float-tool-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          40% { transform: translate(35px, 35px) rotate(6deg); }
          80% { transform: translate(-20px, -15px) rotate(-6deg); }
        }
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 40px) scale(0.9); }
          66% { transform: translate(40px, -30px) scale(1.1); }
        }
      `}</style>

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
