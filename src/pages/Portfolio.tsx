import React, { useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { projects, getProjectsByCategory, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

type Category = "All" | ProjectCategory;

const categories: Category[] = ["All", "Custom Residences", "Renovations & Additions", "Commercial & Hospitality", "Outdoor Living"];

const categoryColors: Record<string, string> = {
  "Residential Construction": "bg-gold text-charcoal",
  "Residential Development": "bg-steelBlue text-white",
  Civil: "bg-steelBlue text-white",
  Hospitality: "bg-burgundy text-white",
  "Design/Build": "bg-gold text-charcoal",
};

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

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
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>Our Work | Michael Chandler | Fine Construction & Design Portfolio</title>
        <meta name="description" content="Browse 30+ years of luxury residential, commercial, and hospitality construction projects by Michael Chandler Fine Construction & Design." />
        <meta property="og:title" content="Our Work | Michael Chandler | Fine Construction & Design Portfolio" />
        <meta property="og:description" content="Browse 30+ years of luxury residential, commercial, and hospitality construction projects." />
      </Helmet>
      <Header />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-charcoal">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="font-playfair text-8xl lg:text-[10rem] text-gold/20 font-light leading-none block -mb-12">
                01
              </span>
              <p className="font-inter text-xs tracking-[0.3em] text-cream/60 uppercase mb-3">
                Our Work
              </p>
              <h1 className="font-playfair text-4xl lg:text-5xl text-cream mb-6">
                Our Work
              </h1>
              <p className="font-playfair text-cream/70 max-w-2xl mx-auto text-xl lg:text-2xl italic leading-relaxed">
                Over 30 years and $500M+ built, each project represents a unique partnership and a commitment to excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Grid Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            {/* Back button */}
            {selectedCategory !== "All" && (
              <div className="mb-10 md:mb-12">
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

            {/* Category filters */}
            <div className="mb-10 md:mb-12 border-b border-charcoal/10">
              <nav className="flex flex-wrap justify-center gap-6 md:gap-10 font-inter text-[10px] md:text-xs tracking-[0.18em] uppercase">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`relative pb-3 transition-colors duration-200 ${isActive
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

            {/* Projects grid */}
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

            {/* Results count */}
            <div className="mt-16 text-center">
              <p className="font-inter text-sm text-muted-foreground">
                Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
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

export default Portfolio;
