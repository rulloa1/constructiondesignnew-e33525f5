import React from "react";
import { BookCoverHero } from "@/components/BookCoverHero";
import { PortfolioSection } from "@/components/PortfolioSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Chatbot } from "@/components/Chatbot";

const Index: React.FC = () => {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BookCoverHero onOpenBook={scrollToPortfolio} />
      
      <div id="portfolio-section">
        <PortfolioSection />
      </div>

      <MusicPlayer />
      <Chatbot />
    </div>
  );
};

export default Index;