import React, { useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { MaterialSwatchOverlay } from "@/components/MaterialSwatchOverlay";
import { projects, getProjectsByCategory } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

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

  const outdoor = useMemo(() => getProjectsByCategory("Outdoor Living"), []);
  const development = useMemo(() => getProjectsByCategory("Residential Development"), []);
  const concepts = useMemo(() => getProjectsByCategory("Commercial & Hospitality"), []);
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
        <div className="container mx-auto max-w-[1600px] px-6 lg:px-12">

          {/* Page Title */}
          <div className="flex justify-center mb-16">
            <div className="border border-charcoal/20 px-12 py-4">
              <h1 className="font-playfair text-4xl lg:text-5xl tracking-[0.4em] text-charcoal uppercase text-center">
                Design
              </h1>
            </div>
          </div>

          {/* Row 1: Showcase & Interiors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Hero Feature - Left */}
            <div className="lg:col-span-8">
              {featuredShowcase && (
                <ProjectCard
                  project={featuredShowcase}
                  index={0}
                  aspectClassName="aspect-[16/9] lg:aspect-[16/10.5]"
                />
              )}
            </div>

            {/* Interiors - Right (3 Vertical Columns) */}
            <div className="lg:col-span-4">
              <div className="mb-4">
                <h2 className="font-playfair text-2xl tracking-[0.3em] text-charcoal uppercase text-center lg:text-right">
                  Interiors
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-4 h-full">
                {featuredInteriors.map((p, i) => (
                  <div key={p.id} className="h-full">
                    <ProjectCard
                      project={p}
                      index={i}
                      aspectClassName="aspect-[2/5] lg:aspect-[3/8]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Architecture (4 Vertical Columns) */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="font-playfair text-2xl tracking-[0.3em] text-charcoal uppercase text-center">
                Architecture
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredArchitecture.slice(0, 4).map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  aspectClassName="aspect-[2/3] lg:aspect-[3/5]"
                />
              ))}
            </div>
          </div>

          {/* Row 3: Reimagined & Pools (Interlocking) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

            {/* Reimagined (Left side - 2 Vertical) */}
            <div className="lg:col-span-6">
              <div className="mb-6">
                <h2 className="font-playfair text-2xl tracking-[0.3em] text-charcoal uppercase text-center lg:text-left">
                  Reimagined
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Coastal Restoration Before/After */}
                <div className="space-y-4">
                  <BeforeAfterSlider
                    afterImage={featuredRenovations[0]?.images[0]}
                    beforeImage={featuredRenovations[0]?.images[1] || featuredRenovations[0]?.images[0]}
                    className="aspect-[2/3] lg:aspect-[3/5.5] shadow-lg"
                  />
                  <div className="px-1">
                    <h3 className="font-playfair text-xl text-charcoal">{featuredRenovations[0]?.title}</h3>
                    <p className="font-inter text-xs uppercase tracking-widest text-gold">{featuredRenovations[0]?.subtitle}</p>
                  </div>
                </div>

                {/* South Coast Renovation Before/After */}
                <div className="space-y-4">
                  <BeforeAfterSlider
                    afterImage={featuredRenovations[1]?.images[0]}
                    beforeImage={featuredRenovations[1]?.images[5] || featuredRenovations[1]?.images[0]}
                    className="aspect-[2/3] lg:aspect-[3/5.5] shadow-lg"
                  />
                  <div className="px-1">
                    <h3 className="font-playfair text-xl text-charcoal">{featuredRenovations[1]?.title}</h3>
                    <p className="font-inter text-xs uppercase tracking-widest text-gold">{featuredRenovations[1]?.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pools & Landscape (Right side - Interlocking) */}
            <div className="lg:col-span-6">
              <div className="mb-6">
                <h2 className="font-playfair text-2xl tracking-[0.3em] text-charcoal uppercase text-center lg:text-right">
                  Pools & Landscape
                </h2>
              </div>
              <div className="grid grid-cols-12 gap-4">
                {/* 1 Tall Vertical (Inner) */}
                <div className="col-span-12 md:col-span-5">
                  {featuredPools[0] && (
                    <ProjectCard
                      project={featuredPools[0]}
                      index={0}
                      aspectClassName="aspect-[3/5] md:aspect-[3/8]"
                    />
                  )}
                </div>
                {/* 2 Horizontal (Outer) */}
                <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
                  {featuredPools[1] && (
                    <ProjectCard
                      project={featuredPools[1]}
                      index={1}
                      aspectClassName="aspect-[16/9] md:aspect-[16/8.5]"
                    />
                  )}
                  {featuredPools[2] && (
                    <ProjectCard
                      project={featuredPools[2]}
                      index={2}
                      aspectClassName="aspect-[16/9] md:aspect-[16/8.5]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Concepts (Wide Horizontal) */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="font-playfair text-2xl tracking-[0.3em] text-charcoal uppercase text-center">
                Concepts
              </h2>
            </div>
            {concepts[0] && (
              <ProjectCard
                project={concepts[0]}
                index={0}
                aspectClassName="aspect-[21/9] lg:aspect-[24/8]"
              />
            )}
          </div>

          {/* Row 5: Development (Small + Long) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-12 mb-6">
              <h2 className="font-playfair text-2xl tracking-[0.3em] text-charcoal uppercase text-center lg:text-left">
                Development
              </h2>
            </div>
            {/* Small block */}
            <div className="lg:col-span-4">
              {development[0] && (
                <ProjectCard
                  project={development[0]}
                  index={0}
                  aspectClassName="aspect-square lg:aspect-[3/4]"
                />
              )}
            </div>
            {/* Long horizontal block */}
            <div className="lg:col-span-8">
              {development[1] ? (
                <ProjectCard
                  project={development[1]}
                  index={1}
                  aspectClassName="aspect-[2/1] lg:aspect-[2.4/1]"
                />
              ) : concepts[1] && (
                <ProjectCard
                  project={concepts[1]}
                  index={1}
                  aspectClassName="aspect-[2/1] lg:aspect-[2.4/1]"
                />
              )}
            </div>
          </div>

          {/* Row 6: Custom Furniture */}
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="font-playfair text-2xl tracking-[0.3em] text-charcoal uppercase text-center">
                Custom Furniture
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {furnitureProjects.map((project, index) => (
                <div key={project.id} className="group relative">
                  <ProjectCard
                    project={project}
                    index={index}
                    aspectClassName="aspect-[4/3] lg:aspect-[1.5/1]"
                  />
                  {/* Material Overlay on Hover */}
                  <MaterialSwatchOverlay
                    materials={[
                      { name: "American Walnut", color: "#4A3728", description: "Sustainably sourced, hand-oiled finish." },
                      { name: "Polished Brass", color: "#C5A059", description: "Solid brass accents, mirror finish." },
                      { name: "Charcoal Ash", color: "#2D2D2D", description: "Deep grain texture, matte seal." }
                    ]}
                  />
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Design;
