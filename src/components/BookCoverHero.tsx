import React from "react";

interface BookCoverHeroProps {
  onOpenBook: () => void;
}

export const BookCoverHero: React.FC<BookCoverHeroProps> = ({ onOpenBook }) => {
  return (
    <section className="py-24 bg-cream/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-8">
          Discover Our Portfolio
        </h2>
        <p className="font-inter text-lg text-charcoal/70 max-w-2xl mx-auto mb-12">
          Explore three decades of exceptional craftsmanship and innovative design across residential, commercial, and hospitality projects.
        </p>
        <button 
          onClick={onOpenBook}
          className="bg-gradient-to-r from-gold to-copper hover:from-gold/90 hover:to-copper/90 text-white px-10 py-6 text-base cursor-pointer shadow-premium hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 rounded-none uppercase tracking-widest font-medium"
        >
          View Portfolio
        </button>
      </div>
    </section>
  );
};

export default BookCoverHero;