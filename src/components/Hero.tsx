import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-mc-portfolio.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <section 
    ref={elementRef as React.RefObject<HTMLElement>}
    className={`relative h-screen w-full overflow-hidden transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
  >
      <div className="absolute inset-0 bg-background">
        <img 
          src={heroImage} 
          alt="Michael Chandler Portfolio - Construction site leader" 
          className="w-full h-full object-cover object-[center_40%] transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
      </div>
      
      {/* Edge Fade Effect */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse 75% 70% at 50% 40%, transparent 0%, transparent 40%, hsl(var(--background) / 0.3) 65%, hsl(var(--background)) 100%)'
        }} 
      />
      
      {/* Text Overlay - Fixed positioning */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 z-10">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-light text-white mb-4 sm:mb-5 md:mb-6 drop-shadow-lg [text-shadow:0_2px_10px_rgba(0,0,0,0.8),0_0_20px_rgba(228,179,33,0.3)] tracking-tight">
            30+ Years of Quality Craftsmanship
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] px-2 font-light tracking-wide">
            Architectural design, landscape restoration, and construction excellence
          </p>
        </div>
      </div>
    </section>;
};