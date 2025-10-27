import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/mc-logo.png";

interface BookCoverHeroProps {
  onOpenBook: () => void;
}

export const BookCoverHero: React.FC<BookCoverHeroProps> = ({ onOpenBook }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-charcoal flex items-center justify-center">
      {/* Ambient background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Book cover */}
      <div 
        className={`relative transition-all duration-500 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-20px)' : 'translateY(0)',
          filter: isHovered ? 'drop-shadow(0 30px 60px rgba(201, 169, 97, 0.3))' : 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))'
        }}
      >
        {/* Book texture and border */}
        <div className="relative w-[400px] h-[600px] md:w-[500px] md:h-[700px] bg-gradient-to-br from-charcoal via-charcoal to-charcoal/90 border-4 border-gold/30 rounded-sm overflow-hidden">
          {/* Leather texture overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          {/* Spine detail */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-12 space-y-8">
            {/* Logo */}
            <div className="mb-8 opacity-0 animate-fade-in">
              <img src={logo} alt="MC Logo" className="h-24 w-auto opacity-80" />
            </div>

            {/* Main title */}
            <div className="text-center space-y-4 opacity-0 animate-fade-in delay-200">
              <h1 className="font-playfair text-5xl md:text-6xl font-semibold tracking-wider text-gold">
                MICHAEL
              </h1>
              <h1 className="font-playfair text-5xl md:text-6xl font-semibold tracking-wider text-gold">
                CHANDLER
              </h1>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-4 opacity-0 animate-fade-in delay-300">
              <div className="w-16 h-px bg-gold/50" />
              <div className="w-2 h-2 rotate-45 border border-gold/50" />
              <div className="w-16 h-px bg-gold/50" />
            </div>

            {/* Subtitle */}
            <p className="font-inter text-cream text-lg md:text-xl font-light tracking-[0.3em] uppercase opacity-0 animate-fade-in delay-400 whitespace-nowrap">
              Fine Construction & Design
            </p>

            {/* CTA Button */}
            <div className="pt-8 opacity-0 animate-fade-in delay-500">
              <Button
                onClick={onOpenBook}
                className="bg-gold hover:bg-gold/90 text-charcoal font-inter font-medium px-8 py-6 text-base tracking-wide uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 animate-pulse-subtle"
              >
                Open Portfolio
              </Button>
            </div>
          </div>

          {/* Corner embellishments */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold/30" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold/30" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold/30" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold/30" />
        </div>
      </div>
    </section>
  );
};
