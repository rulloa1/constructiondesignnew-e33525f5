import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, X, ChevronLeft, ChevronRight, Square, Bed, Droplets,
  Check, CalendarDays, Award, Wallet, Quote, ArrowRight
} from "lucide-react";
import { getProjectById, projects } from "@/data/projects";
import { useState, useEffect, useMemo, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ImageWithWatermark } from "@/components/ImageWithWatermark";
import { PremiumImage } from "@/components/PremiumImage";
import { Helmet } from "react-helmet-async";

interface ProjectVideo {
  id: string;
  video_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
}

interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
  is_before: boolean;
  is_after: boolean;
}

interface ProjectDocument {
  id: string;
  document_url: string;
  file_name: string;
  title: string | null;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [videos, setVideos] = useState<ProjectVideo[]>([]);
  const [dbImages, setDbImages] = useState<ProjectImage[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Get next/prev projects for navigation
  const currentProjectIndex = projects.findIndex(p => p.id === id);
  const prevProject = currentProjectIndex > 0 ? projects[currentProjectIndex - 1] : projects[projects.length - 1];
  const nextProject = currentProjectIndex < projects.length - 1 ? projects[currentProjectIndex + 1] : projects[0];

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch media from Supabase
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const vidRes = await supabase.from('project_videos').select('*').eq('project_id', id).order('display_order', { ascending: true });
      if (!vidRes.error) setVideos(vidRes.data || []);

      const imgRes = await supabase.from('project_images').select('*').eq('project_id', id).order('display_order', { ascending: true });
      if (!imgRes.error) setDbImages(imgRes.data || []);
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const allImages = useMemo(() => {
    const staticImages = project?.images || [];
    const validDbImages = dbImages
      .filter(img => img.image_url && (img.image_url.startsWith('http') || img.image_url.startsWith('https://')))
      .map(img => img.image_url);

    // Combine but ensure cover image is first if it's there
    const combined = [...staticImages, ...validDbImages];
    return Array.from(new Set(combined.filter(img => img != null)));
  }, [project?.images, dbImages]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImageIndex(null);
      else if (e.key === "ArrowLeft") setSelectedImageIndex(prev => prev === 0 ? allImages.length - 1 : (prev ?? 0) - 1);
      else if (e.key === "ArrowRight") setSelectedImageIndex(prev => prev === allImages.length - 1 ? 0 : (prev ?? 0) + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, allImages.length]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="text-4xl font-playfair mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/portfolio")} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const heroImage = allImages.length > 0 ? allImages[0] : project.image;

  return (
    <>
      <div className="min-h-screen bg-charcoal selection:bg-gold selection:text-white">
        <Helmet>
          <title>{project.title} | Michael Chandler Portfolio</title>
          <meta name="description" content={project.description} />
        </Helmet>
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
          <Button
            variant="ghost"
            onClick={() => navigate("/portfolio")}
            className="text-white hover:text-gold pointer-events-auto flex items-center gap-2 group"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-inter text-xs uppercase tracking-widest">Back to Our Work</span>
          </Button>
        </nav>

        {/* Immersive Hero Section */}
        <section ref={heroRef} className="relative h-[85vh] w-full overflow-hidden bg-charcoal">
          <PremiumImage
            src={heroImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
            layoutId={`project-image-${project.id}`}
            style={{
              transform: `translateY(${scrollY * 0.4}px) scale(${1.1 + scrollY * 0.0005})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

          <div className="absolute bottom-20 left-0 right-0 px-6 sm:px-10">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block text-gold font-inter text-xs uppercase tracking-[0.4em] mb-4 animate-fade-in">
                {project.category}
              </span>
              <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-semibold tracking-tight leading-none mb-4 animate-fade-in delay-100">
                {project.title}
              </h1>
              <div className="flex items-center gap-4 animate-fade-in delay-200">
                <div className="w-12 h-[1px] bg-gold" />
                <p className="text-white/60 font-inter text-sm uppercase tracking-widest">
                  {project.location}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Specs Bar */}
        <section className="sticky top-0 z-30 bg-charcoal border-y border-white/5 py-8 drop-shadow-xl">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start space-y-1">
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-inter">Size</span>
              <span className="text-white font-playfair text-xl">{project.sqft?.toLocaleString() || '—'} SF</span>
            </div>
            <div className="flex flex-col items-center md:items-start space-y-1">
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-inter">Configuration</span>
              <span className="text-white font-playfair text-xl">
                {project.bedrooms || '—'} BD / {project.baths || '—'} BA
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start space-y-1">
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-inter">Duration</span>
              <span className="text-white font-playfair text-xl">{project.duration || '—'}</span>
            </div>
            <div className="flex flex-col items-center md:items-start space-y-1">
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-inter">Completed</span>
              <span className="text-white font-playfair text-xl">{project.completedYear || '—'}</span>
            </div>
          </div>
        </section>

        {/* The Vision & Story Section */}
        <section className="py-24 lg:py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left side: The Story */}
            <div className="lg:col-span-12">
              <div className="max-w-4xl">
                <span className="font-playfair text-6xl lg:text-8xl text-gold/10 font-light leading-none block -mb-4 lg:-mb-6">
                  Vision
                </span>
                <p className="font-inter text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6">The Story</p>
                <h2 className="font-playfair text-4xl lg:text-5xl text-charcoal mb-10 italic">
                  "{project.description}"
                </h2>
                <div className="columns-1 md:columns-2 gap-12 font-inter text-charcoal/70 leading-relaxed space-y-6 text-lg">
                  {project.vision ? (
                    project.vision.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))
                  ) : (
                    <p>Building the exceptional requires more than just materials; it requires a deep understanding of the client's aspirations and the environment's unique challenges. This project stands as a testament to that synergy, where architectural brilliance meets flawless execution.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Key Features List */}
            {project.features && (
              <div className="lg:col-span-12 mt-16 lg:mt-24 pt-16 border-t border-charcoal/10">
                <p className="font-inter text-xs tracking-[0.3em] text-muted-foreground uppercase mb-10">Key Features</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="mt-1 w-5 h-5 rounded-full border border-gold flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
                        <Check className="h-3 w-3 text-gold group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-inter text-charcoal/80 group-hover:text-charcoal transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-12 px-6 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            {allImages.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {allImages.slice(1).map((image, index) => {
                  const actualIndex = index + 1;
                  // Alternate between full-width and half-width for a more dynamic feel
                  const isWide = (index + 2) % 3 === 0;
                  return (
                    <div
                      key={index}
                      className={`relative overflow-hidden cursor-pointer group ${isWide ? 'md:col-span-2 aspect-[16/6]' : 'aspect-square'}`}
                      onClick={() => setSelectedImageIndex(actualIndex)}
                    >
                      <ImageWithWatermark>
                        <img
                          src={image}
                          alt={`${project.title} gallery ${index}`}
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                          style={{
                            filter: project.lightingTheme === "sunset" ? 
                              `contrast(1.1) brightness(1.05) sepia(0.3) saturate(1.3) hue-rotate(-5deg)` 
                              : undefined
                          }}
                        />
                      </ImageWithWatermark>
                      {project.lightingTheme === "sunset" && (
                        <>
                          <div
                            className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out mix-blend-soft-light"
                            style={{
                              background: `radial-gradient(circle at 85% 20%, rgba(255, 200, 50, 0.2), transparent 60%)`
                            }}
                          />
                          <div
                            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none transition-all duration-1000 ease-in-out opacity-40 mix-blend-overlay"
                            style={{
                              background: `linear-gradient(to top, rgba(255, 100, 0, 0.2), transparent)`
                            }}
                          />
                        </>
                      )}
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Testimonial Section */}
        {project.testimonial && (
          <section className="py-24 lg:py-32 px-6 bg-white border-y border-gold/10">
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="h-12 w-12 text-gold/30 mx-auto mb-8" />
              <p className="font-playfair text-2xl lg:text-3xl text-charcoal italic leading-relaxed mb-10">
                {project.testimonial.includes("—") ? project.testimonial.split("—")[0] : project.testimonial}
              </p>
              {project.testimonial.includes("—") && (
                <p className="font-inter text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                  — {project.testimonial.split("—")[1]}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Next/Prev Navigation */}
        <section className="py-24 px-6 border-t border-charcoal/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <Link
              to={`/projects/${prevProject.id}`}
              className="group flex flex-col items-center md:items-start text-center md:text-left max-w-sm"
            >
              <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 flex items-center gap-2 group-hover:text-gold transition-colors">
                <ChevronLeft className="h-3 w-3" /> Previous Project
              </span>
              <h4 className="font-playfair text-2xl text-charcoal group-hover:text-gold transition-colors underline decoration-gold/0 group-hover:decoration-gold/100 underline-offset-8">
                {prevProject.title}
              </h4>
            </Link>

            <div className="hidden md:block w-[1px] h-24 bg-gold/20" />

            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex flex-col items-center md:items-end text-center md:text-right max-w-sm"
            >
              <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 flex items-center gap-2 group-hover:text-gold transition-colors">
                Next Project <ChevronRight className="h-3 w-3" />
              </span>
              <h4 className="font-playfair text-2xl text-charcoal group-hover:text-gold transition-colors underline decoration-gold/0 group-hover:decoration-gold/100 underline-offset-8">
                {nextProject.title}
              </h4>
            </Link>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {
        selectedImageIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl animate-fade-in flex flex-col" onClick={() => setSelectedImageIndex(null)}>
            <button className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-50">
              <X className="h-8 w-8" />
            </button>

            <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden" onClick={e => e.stopPropagation()}>
              <ImageWithWatermark>
                <img
                  src={allImages[selectedImageIndex]}
                  alt="Fullscreen"
                  className="max-w-full max-h-[85vh] object-contain shadow-2xl animate-scale-in transition-all duration-700 ease-in-out"
                  style={{
                    filter: project.lightingTheme === "sunset" ? (() => {
                      const p = selectedImageIndex / (allImages.length - 1 || 1);
                      if (p < 0.2) return `sepia(0.2) brightness(1.1) saturate(1.1) contrast(1.02)`;
                      if (p < 0.4) return `sepia(0.4) hue-rotate(-5deg) brightness(1.08) saturate(1.3) contrast(1.05)`;
                      if (p < 0.6) return `sepia(0.5) hue-rotate(-15deg) brightness(1.02) saturate(1.5) contrast(1.1) drop-shadow(0 0 15px rgba(255,180,0,0.2))`;
                      if (p < 0.8) return `sepia(0.3) hue-rotate(-30deg) brightness(0.85) contrast(1.15) saturate(1.2) drop-shadow(0 0 20px rgba(255,100,0,0.1))`;
                      return `brightness(0.65) contrast(1.2) saturate(1.1) hue-rotate(190deg) sepia(0.1) brightness(0.9)`;
                    })() : undefined
                  }}
                />
              </ImageWithWatermark>
              {project.lightingTheme === "sunset" && (
                <>
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out mix-blend-soft-light"
                    style={{
                      background: (() => {
                        const p = selectedImageIndex / (allImages.length - 1 || 1);
                        if (p < 0.2) return `radial-gradient(circle at 80% 20%, rgba(255, 240, 150, 0.15), transparent 70%)`;
                        if (p < 0.4) return `radial-gradient(circle at 85% 25%, rgba(255, 200, 50, 0.25), transparent 60%)`;
                        if (p < 0.6) return `linear-gradient(135deg, rgba(255, 120, 0, 0.2), transparent 50%), radial-gradient(circle at 90% 30%, rgba(255, 100, 0, 0.3), transparent 70%)`;
                        if (p < 0.8) return `linear-gradient(to top, rgba(255, 50, 0, 0.15), rgba(120, 0, 255, 0.1)), radial-gradient(circle at 95% 40%, rgba(255, 50, 0, 0.2), transparent 80%)`;
                        return `linear-gradient(to top, rgba(0, 30, 100, 0.4), rgba(50, 0, 120, 0.2))`;
                      })()
                    }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none transition-all duration-1000 ease-in-out opacity-40 mix-blend-overlay"
                    style={{
                      background: (() => {
                        const p = selectedImageIndex / (allImages.length - 1 || 1);
                        if (p < 0.5) return `linear-gradient(to top, rgba(255, 180, 0, 0.2), transparent)`;
                        if (p < 0.8) return `linear-gradient(to top, rgba(255, 80, 0, 0.3), transparent)`;
                        return `linear-gradient(to top, rgba(100, 0, 255, 0.2), transparent)`;
                      })()
                    }}
                  />
                </>
              )}
            </div>

            <div className="h-32 px-6 flex items-center justify-between max-w-7xl mx-auto w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(prev => prev === 0 ? allImages.length - 1 : (prev ?? 0) - 1);
                }}
                className="text-white hover:text-gold transition-colors flex items-center gap-4 group"
              >
                <ChevronLeft className="h-8 w-8 group-hover:-translate-x-2 transition-transform" />
                <span className="font-inter text-xs uppercase tracking-widest hidden sm:block">Previous</span>
              </button>
              <span className="font-inter text-white/40 text-xs tracking-widest">
                {selectedImageIndex + 1} <span className="mx-2">/</span> {allImages.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(prev => prev === allImages.length - 1 ? 0 : (prev ?? 0) + 1);
                }}
                className="text-white hover:text-gold transition-colors flex items-center gap-4 group"
              >
                <span className="font-inter text-xs uppercase tracking-widest hidden sm:block">Next</span>
                <ChevronRight className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default ProjectDetail;
