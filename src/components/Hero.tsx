import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/michael-chandler-portfolio.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const {
    elementRef,
    isVisible
  } = useScrollAnimation({
    threshold: 0.1
  });
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <section ref={elementRef as React.RefObject<HTMLElement>} className="relative min-h-screen w-full overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img src={heroImage} alt="Michael Chandler - 37 years of quality craftsmanship" width={1920} height={1080} className="w-full h-full object-cover object-center transition-transform duration-100 ease-out" style={{
        transform: `translateY(${scrollY * 0.3}px)`
      }} loading="eager" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
    </div>

    {/* Hero Content */}
    <div className="relative h-screen flex items-center">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Large decorative number */}
          <span className={`font-playfair text-[8rem] lg:text-[12rem] text-white/10 font-light leading-none block -mb-16 lg:-mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            01
          </span>

          {/* Main heading */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-inter text-xs tracking-[0.35em] text-white/70 uppercase mb-5 font-light">
              Design • Build • Develop
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight font-semibold" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.5), 0 4px 60px rgba(0,0,0,0.3)' }}>
              30+ Years. $500M+ Built. <br className="hidden lg:block" />
              One Standard: <span className="text-gold">Exceptional.</span>
            </h1>
            <div className="w-20 h-[2px] bg-gradient-to-r from-gold to-gold/40 mb-7 shadow-gold-glow" />
            <p className="font-inter text-lg text-white/90 leading-relaxed max-w-xl mb-10 font-light" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Michael Chandler Fine Construction & Design has delivered landmark projects across Texas, multiple U.S. states, and international destinations. From custom estates to boutique hotels, we bring vision to life.
            </p>
          </div>

          {/* CTAs */}
          <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              onClick={() => {
                const portfolioSection = document.getElementById('portfolio-trigger');
                if (portfolioSection) {
                  portfolioSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-gold to-copper hover:from-gold/90 hover:to-copper/90 text-white px-10 py-6 text-base cursor-pointer shadow-premium hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 rounded-none uppercase tracking-widest font-medium"
            >
              View Portfolio
            </Button>
            <Button asChild variant="outline" className="border-white/40 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/60 px-10 py-6 text-base shadow-elegant transition-all duration-300 hover:-translate-y-1 rounded-none uppercase tracking-widest font-medium">
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center gap-2 animate-pulse-subtle">
        <span className="font-inter text-xs text-white/60 uppercase tracking-[0.3em] font-light">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/60 via-gold/40 to-transparent" />
      </div>
    </div>
  </section>;
};