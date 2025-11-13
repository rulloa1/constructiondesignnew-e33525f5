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
      
      {/* Edge Fade Effect with Parallax */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out" 
        style={{
          background: 'radial-gradient(ellipse 75% 70% at 50% 40%, transparent 0%, transparent 40%, hsl(var(--background) / 0.3) 65%, hsl(var(--background)) 100%)',
          transform: `translateY(${scrollY * 0.15}px)`
        }} 
      />
      
      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold text-white mb-3 sm:mb-4 md:mb-5 leading-tight [text-shadow:0_0_20px_rgba(228,179,33,0.3),0_0_40px_rgba(228,179,33,0.15)]">30+ Years of Quality Craftsmanship</h2>
          <p className="text-base sm:text-lg md:text-xl font-inter font-light text-white/90 max-w-3xl mx-auto leading-relaxed [text-shadow:0_0_15px_rgba(228,179,33,0.2)] px-2">
            Architectural design, landscape restoration, and construction excellence
          </p>
        </div>
      </div>
    </section>;
};