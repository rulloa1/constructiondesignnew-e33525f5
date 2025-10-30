import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { BookCoverHero } from "@/components/BookCoverHero";
import { Portfolio } from "@/components/Portfolio";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Chatbot } from "@/components/Chatbot";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

const Index: React.FC = () => {
  const [bookOpened, setBookOpened] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleOpenBook = () => {
    setAnimating(true);
    setTimeout(() => {
      setBookOpened(true);
      setAnimating(false);
    }, 1500);
  };

  const handleClosebook = () => {
    setBookOpened(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Book opening animation overlay */}
      {animating && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-1/2 h-full bg-charcoal animate-book-open-left origin-right" />
          <div className="w-1/2 h-full bg-charcoal animate-book-open-right origin-left" />
        </div>
      )}

      {!bookOpened ? (
        <>
          <Header />
          <Hero />
          <Services />
          <BookCoverHero onOpenBook={handleOpenBook} />
        </>
      ) : (
        <>
          <MusicPlayer />
          <Portfolio onClose={handleClosebook} />
          <Services />
          <About />
          <Contact />
        </>
      )}

      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;