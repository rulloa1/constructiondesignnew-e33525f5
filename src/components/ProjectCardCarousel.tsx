import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Project } from "@/data/projects";
import { ImageWithWatermark } from "./ImageWithWatermark";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectCardCarouselProps {
  project: Project;
  categoryColor: string;
  index: number;
}

export const ProjectCardCarousel: React.FC<ProjectCardCarouselProps> = ({
  project,
  categoryColor,
  index,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(project.images.length);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleImageLoad = (imgIndex: number) => {
    setImagesLoaded(prev => new Set(prev).add(imgIndex));
  };

  return (
    <Link
      to={`/project/${project.id}`}
      className="group cursor-pointer opacity-0 animate-fade-in-up block"
      style={{ animationDelay: `${index * 100 + 400}ms` }}
    >
      <div 
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-charcoal shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        <Carousel 
          setApi={setApi} 
          className="w-full h-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="h-full -ml-0">
            {project.images.map((image, imgIndex) => (
              <CarouselItem key={imgIndex} className="h-full pl-0">
                <ImageWithWatermark>
                  <div className="h-full relative">
                    {!imagesLoaded.has(imgIndex) && (
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    {isVisible && (
                      <img
                        src={image}
                        alt={`${project.title} - Image ${imgIndex + 1}`}
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                          imagesLoaded.has(imgIndex) ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(imgIndex)}
                        decoding="async"
                      />
                    )}
                  </div>
                </ImageWithWatermark>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows - Only show if more than 1 image */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  api?.scrollPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 h-10 w-10 rounded-full bg-white/95 hover:bg-white hover:scale-110 text-charcoal flex items-center justify-center z-10 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  api?.scrollNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 h-10 w-10 rounded-full bg-white/95 hover:bg-white hover:scale-110 text-charcoal flex items-center justify-center z-10 shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </Carousel>

        {/* Image Counter Badge */}
        {project.images.length > 1 && (
          <div className="absolute top-4 right-4 bg-charcoal/90 backdrop-blur-sm text-cream px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider z-10 shadow-lg border border-white/10">
            {current} / {count}
          </div>
        )}

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />
        
        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: 'opacity 0.7s, transform 1s' }} />

        {/* Overlay Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 pointer-events-none">
          <span
            className={`inline-block w-fit px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold mb-4 transition-all duration-300 shadow-lg ${categoryColor}`}
          >
            {project.category}
          </span>
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-cream group-hover:text-gold mb-2 transition-all duration-300 transform group-hover:translate-x-1">
            {project.title}
          </h3>
          <p className="font-inter text-sm text-cream/90 group-hover:text-cream font-light transition-all duration-300 tracking-wide">
            {project.location}
          </p>
        </div>
      </div>
    </Link>
  );
};
