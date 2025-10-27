import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { DesignDevelopment } from "@/components/DesignDevelopment";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { MusicPlayer } from "@/components/MusicPlayer";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
const Index: React.FC = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const handleViewProjects = (category: string) => {
    setSelectedCategory(category);
    setShowPortfolio(true);
  };
  const handleClosePortfolio = () => {
    setShowPortfolio(false);
    setSelectedCategory("All");
  };
  return <div className="min-h-screen">
      <MusicPlayer />
      
      {!showPortfolio ? <>
          <Hero />
          <CategoryShowcase onViewProjects={handleViewProjects} />
          
          <About />
          <Contact />
          <Footer />
        </> : <PortfolioGrid onClose={handleClosePortfolio} initialCategory={selectedCategory} />}
      
      <Chatbot />
    </div>;
};
export default Index;