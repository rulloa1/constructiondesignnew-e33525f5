import React, { useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProjectsByCategory } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Helmet } from "react-helmet-async";

const Design: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch Projects by Category
  const interiors = useMemo(() => getProjectsByCategory("Custom Residences"), []);
  const architecture = useMemo(() => getProjectsByCategory("Residential Construction"), []);
  const renovations = useMemo(() => getProjectsByCategory("Renovations & Additions"), []);
  const outdoor = useMemo(() => getProjectsByCategory("Outdoor Living"), []);
  const commercial = useMemo(() => getProjectsByCategory("Commercial & Hospitality"), []);

  // Featured Highlights (Select specific projects for impact)
  const featuredShowcase = interiors[0]; // Main big image
  const featuredInteriors = interiors.slice(1, 4); // 3 vertical images

  const featuredArchitecture = architecture.slice(0, 4); // 4 vertical columns

  // Split Feature: Reimagined (Left) & Pools (Right)
  const featuredRenovations = renovations.slice(0, 2); // 2 Large Vertical
  const featuredPools = outdoor.slice(0, 3); // 1 Vertical, 2 Horizontal grid typically, or just 3 tiles

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
              {commercial[0] && (
                <ProjectCard project={commercial[0]} index={0} categoryColor="text-charcoal" />
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
                {commercial.slice(1, 3).map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} categoryColor="text-charcoal" />
                ))}
              </div>
            </div>
          </div>

          {/* New Section: Custom Furniture (Placeholder using existing projects for now) */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl tracking-[0.2em] text-charcoal uppercase">
                Custom Furniture
              </h2>
            </div>
            <div className="h-96 md:h-[500px] w-full bg-charcoal/5 flex items-center justify-center relative overflow-hidden group">
              {/* Placeholder Content */}
              <div className="text-center z-10 p-8">
                <p className="font-playfair text-xl text-charcoal/60 italic">Bespoke furniture collection coming soon.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Design;
