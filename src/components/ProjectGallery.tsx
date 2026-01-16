import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectImage {
  id: string;
  image_url: string;
  rotation_angle: number;
}

interface ProjectGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: ProjectImage[];
  initialIndex?: number;
  lightingTheme?: "sunset";
}

export const ProjectGallery = ({
  open,
  projectTitle,
  images,
  initialIndex = 0,
  lightingTheme,
}: ProjectGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-playfair">{projectTitle}</DialogTitle>
        </DialogHeader>

        <div className="relative flex-1 flex items-center justify-center p-6">
          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={images[currentIndex].image_url}
              alt={`${projectTitle} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain transition-all duration-700 ease-in-out"
              style={{
                transform: `rotate(${images[currentIndex].rotation_angle || 0}deg)`,
                filter: lightingTheme === "sunset" ? (() => {
                  const p = currentIndex / (images.length - 1 || 1);
                  if (p < 0.2) return `sepia(0.2) brightness(1.1) saturate(1.1) contrast(1.02)`; // Dawn/Early Golden
                  if (p < 0.4) return `sepia(0.4) hue-rotate(-5deg) brightness(1.08) saturate(1.3) contrast(1.05)`; // Early Golden Hour
                  if (p < 0.6) return `sepia(0.5) hue-rotate(-15deg) brightness(1.02) saturate(1.5) contrast(1.1) drop-shadow(0 0 15px rgba(255,180,0,0.2))`; // Peak Sunset
                  if (p < 0.8) return `sepia(0.3) hue-rotate(-30deg) brightness(0.85) contrast(1.15) saturate(1.2) drop-shadow(0 0 20px rgba(255,100,0,0.1))`; // Late Dusk
                  return `brightness(0.65) contrast(1.2) saturate(1.1) hue-rotate(190deg) sepia(0.1) brightness(0.9)`; // Deep Twilight
                })() : undefined
              }}
            />
            {lightingTheme === "sunset" && (
              <>
                {/* Atmospheric Haze/Glow */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out mix-blend-soft-light"
                  style={{
                    background: (() => {
                      const p = currentIndex / (images.length - 1 || 1);
                      if (p < 0.2) return `radial-gradient(circle at 80% 20%, rgba(255, 240, 150, 0.15), transparent 70%)`;
                      if (p < 0.4) return `radial-gradient(circle at 85% 25%, rgba(255, 200, 50, 0.25), transparent 60%)`;
                      if (p < 0.6) return `linear-gradient(135deg, rgba(255, 120, 0, 0.2), transparent 50%), radial-gradient(circle at 90% 30%, rgba(255, 100, 0, 0.3), transparent 70%)`;
                      if (p < 0.8) return `linear-gradient(to top, rgba(255, 50, 0, 0.15), rgba(120, 0, 255, 0.1)), radial-gradient(circle at 95% 40%, rgba(255, 50, 0, 0.2), transparent 80%)`;
                      return `linear-gradient(to top, rgba(0, 30, 100, 0.4), rgba(50, 0, 120, 0.2))`;
                    })()
                  }}
                />
                {/* Horizon Bleed */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none transition-all duration-1000 ease-in-out opacity-40 mix-blend-overlay"
                  style={{
                    background: (() => {
                      const p = currentIndex / (images.length - 1 || 1);
                      if (p < 0.5) return `linear-gradient(to top, rgba(255, 180, 0, 0.2), transparent)`;
                      if (p < 0.8) return `linear-gradient(to top, rgba(255, 80, 0, 0.3), transparent)`;
                      return `linear-gradient(to top, rgba(100, 0, 255, 0.2), transparent)`;
                    })()
                  }}
                />
              </>
            )}
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={goToNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 px-4 py-2 rounded-full text-sm font-inter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto p-6 pt-0">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                  ? "border-primary scale-105"
                  : "border-border opacity-60 hover:opacity-100"
                  }`}
              >
                <img
                  src={image.image_url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{ transform: `rotate(${image.rotation_angle || 0}deg)` }}
                />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
