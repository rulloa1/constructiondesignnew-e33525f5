import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { projects, getProjectsByCategory, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Helmet } from "react-helmet-async";

type Category = "All" | ProjectCategory;

const categories: Category[] = ["All", "Custom Residences", "Renovations & Additions", "Commercial & Hospitality", "Outdoor Living"];

const Design: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Memoize filtered projects to prevent recalculation on every render
  const filteredProjects = useMemo(() => {
    return getProjectsByCategory(selectedCategory);
  }, [selectedCategory]);

  // Memoize getCategoryCount to prevent recreation
  const getCategoryCount = useCallback((category: Category) => {
    if (category === "All") return projects.length;
    return getProjectsByCategory(category).length;
  }, []);

  return (
    <div className="min-h-screen bg-cream selection:bg-gold selection:text-white">
      <Helmet>
        <title>Portfolio | Michael Chandler | Luxury Construction</title>
        <meta name="description" content="Explore our portfolio of custom residences, luxury renovations, commercial spaces, and outdoor living environments." />
      </Helmet>
      <Header />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
          {/* Subtle decorative background element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="container mx-auto max-w-7xl px-6 relative z-10">
            <div className="text-center lg:text-left">
              <span className="font-playfair text-7xl lg:text-9xl text-gold/10 font-light leading-none block -mb-4 lg:-mb-6">
                Portfolio
              </span>
              <p className="font-inter text-xs tracking-[0.4em] text-gold uppercase mb-6 animate-fade-in">
                Michael Chandler
              </p>
              <h1 className="font-playfair text-5xl lg:text-6xl text-white mb-8 animate-fade-in delay-100 uppercase tracking-tight">
                Our Work
              </h1>
              <p className="font-playfair text-white/60 max-w-2xl text-xl lg:text-2xl italic leading-relaxed animate-fade-in delay-200">
                "Each project is a testament to the belief that the best results grow from a deep respect for both design vision and construction excellence."
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Grid Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-6">

            {/* Category filters */}
            <div className="mb-16 md:mb-20">
              <nav className="flex flex-wrap justify-center lg:justify-start gap-8 lg:gap-12 font-inter text-[10px] tracking-[0.25em] uppercase border-b border-charcoal/10 pb-6">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`relative pb-2 transition-all duration-300 group ${isActive
                        ? "text-gold"
                        : "text-charcoal/40 hover:text-charcoal/80"
                        }`}
                    >
                      <span className="whitespace-nowrap font-medium flex items-center gap-2">
                        {category}
                        <span className={`text-[9px] opacity-50 ${isActive ? 'text-gold' : ''}`}>({getCategoryCount(category)})</span>
                      </span>
                      <span className={`absolute inset-x-0 -bottom-[1px] h-[1.5px] bg-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>

            {/* Results count */}
            <div className="mt-24 text-center">
              <div className="w-12 h-[1px] bg-gold/30 mx-auto mb-6" />
              <p className="font-playfair italic text-charcoal/40 text-lg">
                Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'Legacy Project' : 'Legacy Projects'}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Design;
