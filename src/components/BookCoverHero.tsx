// BookCoverHero.tsx
import React from "react";

interface BookCoverHeroProps {
  onOpenBook: () => void;
  disabled?: boolean;
}

export const BookCoverHero: React.FC<BookCoverHeroProps> = ({ onOpenBook, disabled = false }) => {
  return (
    <section className="py-20 px-4" id="portfolio-entry">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Portfolio</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Step into our world of fine construction and design. Click below to open our portfolio book.
        </p>
        <button
          onClick={onOpenBook}
          disabled={disabled}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
          aria-label="Open portfolio book"
        >
          Open Portfolio Book
        </button>
      </div>
    </section>
  );
};
