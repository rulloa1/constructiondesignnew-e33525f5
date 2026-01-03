import React, { useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { projects, getProjectsByCategory } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Helmet } from "react-helmet-async";

const Design: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch Projects by Category
  const interiors = useMemo(() => getProjectsByCategory("Residential Construction"), []);
  const architecture = useMemo(() => getProjectsByCategory("Design/Build"), []);

  // Filter for renovations specifically or fallback to related
  const renovations = useMemo(() => projects.filter(p =>
    p.title.toLowerCase().includes("renovation") ||
    p.category === "Renovations & Additions"
  ), []);

  const outdoor = useMemo(() => getProjectsByCategory("Hospitality"), []);
  const development = useMemo(() => getProjectsByCategory("Residential Development"), []);
  const concepts = useMemo(() => getProjectsByCategory("Civil"), []);
  const furnitureProjects = useMemo(() => getProjectsByCategory("Furniture"), []);

  // Featured Highlights (Select specific projects for impact)
  const featuredShowcase = interiors[0]; // Main big image
  const featuredInteriors = interiors.slice(1, 4);

  const featuredArchitecture = architecture.slice(0, 4);

  // Split Feature: Reimagined (Left) & Pools (Right)
  const featuredRenovations = renovations.slice(0, 2);
  const featuredPools = outdoor.slice(0, 3);

  const featuredDevelopment = development.length > 0 ? development : concepts;

  return (
    <div className="min-h-screen bg-cream selection:bg-gold selection:text-white">
      <Helmet>
        <title>Design Portfolio | Michael Chandler</title>
        <meta name="description" content="Curated portfolio of custom residences, interiors, architecture, and luxury outdoor living spaces." />
      </Helmet>
      <Header />

      <div className="pt-24 pb-24">
        <div className="container mx-auto max-w-[1400px] px-6 lg:px-12">

          {/* Page Title */}
          <div className="text-center mb-20 lg:mb-32">
            <h1 className="font-playfair text-5xl lg:text-7xl tracking-[0.2em] text-charcoal uppercase border-b border-charcoal/10 pb-8 inline-block">
              Design
            </h1>
          </div>

          {/* Section 1: Showcase & Interiors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-32">
            {/* Featured Highlight - Left (Large) */}
            <div className="lg:col-span-7 space-y-4">
              {featuredShowcase && (
                <ProjectCard project={featuredShowcase} index={0} categoryColor="text-gold" />
              )}
            </div>

            {/* Interiors Column - Right */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="text-center lg:text-left mb-4">
                <h2 className="font-playfair text-2xl tracking-[0.2em] text-charcoal uppercase">
                  Interiors
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                {featuredInteriors.map((p, i) => (
                  <div key={p.id} className="h-full">
                    <ProjectCard project={p} index={i} categoryColor="text-gold" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Architecture */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl tracking-[0.2em] text-charcoal uppercase">
                Architecture
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredArchitecture.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} categoryColor="text-charcoal" />
              ))}
            </div>
          </div>

          {/* Section 3: Reimagined & Pools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">

            {/* Reimagined (Renovations) */}
            <div>
              <div className="text-center mb-12">
                <h2 className="font-playfair text-2xl tracking-[0.2em] text-charcoal uppercase">
                  Reimagined
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredRenovations.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} categoryColor="text-charcoal" />
                ))}
              </div>
            </div>

            {/* Pools & Landscape */}
            <div>
              <div className="text-center mb-12">
                <h2 className="font-playfair text-2xl tracking-[0.2em] text-charcoal uppercase">
                  Pools & Landscape
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPools.map((p, i) => (
                  <div key={p.id} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                    <ProjectCard project={p} index={i} categoryColor="text-charcoal" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Development & Concepts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24">
            {/* Development */}
            <div className="lg:col-span-4">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-2xl tracking-[0.2em] text-charcoal uppercase">
                  Development
                </h2>
              </div>
              {featuredDevelopment[0] && (
                <ProjectCard project={featuredDevelopment[0]} index={0} categoryColor="text-charcoal" />
              )}
            </div>

            {/* Concepts */}
            <div className="lg:col-span-8">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-2xl tracking-[0.2em] text-charcoal uppercase">
                  Concepts
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {concepts.slice(0, 2).map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} categoryColor="text-charcoal" />
                ))}
              </div>
            </div>
          </div>

          {/* New Section: Custom Furniture */}
          <section className="mb-24 relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-3xl -z-10" />

            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8 px-4">
              <div className="max-w-xl">
                <h2 className="font-playfair text-2xl tracking-[0.2em] text-charcoal uppercase mb-6">
                  Custom Furniture
                </h2>
                <p className="font-inter text-charcoal/70 leading-relaxed">
                  Bespoke pieces designed and fabricated in-house to complement our architectural vision.
                  Where structure meets artistry.
                </p>
              </div>
              <div className="hidden lg:block h-[1px] flex-grow bg-gold/20 mx-12 mb-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {furnitureProjects.length > 0 ? (
                furnitureProjects.map((project, index) => (
                  <div key={project.id} className="group cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-6">
                      <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="font-inter text-xs tracking-widest text-gold uppercase">{project.subtitle}</p>
                      <h3 className="font-playfair text-2xl text-charcoal group-hover:text-gold transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center border border-dashed border-charcoal/10 bg-white/50 rounded-lg">
                  <p className="font-inter text-charcoal/50 italic mb-2">New collection pieces arriving soon.</p>
                  <span className="text-gold text-sm uppercase tracking-widest">In Fabrication</span>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Design;
