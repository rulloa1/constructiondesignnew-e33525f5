import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/michael-chandler-portfolio.png";

const Landing: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-charcoal flex items-center justify-center">
      <Helmet>
        <title>Michael Chandler | Luxury Construction & Design</title>
        <meta name="description" content="Michael Chandler Fine Construction & Design. 30+ Years of Exceptional Craftsmanship." />
      </Helmet>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Michael Chandler Portfolio" 
          className={`w-full h-full object-cover transition-transform duration-[20s] ease-out ${loaded ? 'scale-105' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight">
            Michael Chandler
          </h1>
          <div className="w-24 h-[1px] bg-gold mx-auto mb-8" />
          <p className="font-inter text-lg md:text-xl text-white/80 tracking-[0.2em] uppercase mb-12 font-light">
            Fine Construction & Design
          </p>
          
          <Button 
            asChild 
            className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/60 px-12 py-8 text-lg uppercase tracking-[0.2em] transition-all duration-500 rounded-none backdrop-blur-sm"
          >
            <Link to="/home">Enter Site</Link>
          </Button>
        </div>
      </div>

      {/* Footer/Copyright */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-white/40 text-xs font-inter tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Michael Chandler
        </p>
      </div>
    </div>
  );
};

export default Landing;
