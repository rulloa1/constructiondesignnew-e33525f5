import React, { useState } from "react";
import { BookCoverHero } from "@/components/BookCoverHero";
import { Portfolio } from "@/components/Portfolio";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Chatbot } from "@/components/Chatbot";

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
        <BookCoverHero onOpenBook={handleOpenBook} />
      ) : (
        <>
          <MusicPlayer />
          <Portfolio onClose={handleClosebook} />
        </>
      )}

      <Chatbot />
    </div>
  );
};

export default Index;