import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/michael-chandler-portfolio.png";

const Landing: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-charcoal flex items-center justify-center">
      <Helmet>
        <title>Michael Chandler | Luxury Construction & Design</title>
        <meta name="description" content="Michael Chandler Fine Construction & Design. 30+ Years of Exceptional Craftsmanship." />
      </Helmet>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Michael Chandler Portfolio" 
          className={`w-full h-full object-cover transition-all duration-[2s] ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            transform: `scale(1.1) translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` 
          }}
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-[2s] ease-out" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex flex-col items-center">
          <h1 className={`font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Michael Chandler
          </h1>
          <div className={`w-24 h-[1px] bg-gold mx-auto mb-8 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 w-24' : 'opacity-0 w-0'}`} />
          <p className={`font-inter text-lg md:text-xl text-white/90 tracking-[0.2em] uppercase mb-12 font-light transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Fine Construction & Design
          </p>
          
          <div className={`transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button 
              asChild 
              className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/60 px-12 py-8 text-lg uppercase tracking-[0.2em] transition-all duration-500 rounded-none backdrop-blur-sm group"
            >
              <Link to="/home">
                <span className="relative z-10">Enter Site</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer/Copyright */}
      <div className={`absolute bottom-8 left-0 right-0 text-center z-10 transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-white/40 text-xs font-inter tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Michael Chandler
        </p>
      </div>
    </div>
  );
};

export default Landing;
