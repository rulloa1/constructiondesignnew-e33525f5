import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { BookCoverHero } from "@/components/BookCoverHero";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Services } from "@/components/Services";
import { CredibilityBar } from "@/components/CredibilityBar";
import { ProcessSection } from "@/components/ProcessSection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index: React.FC = () => {
  const location = useLocation();
  const [bookOpened, setBookOpened] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.openPortfolio) {
      setBookOpened(true);
      window.history.replaceState(null, "", "#portfolio");
    } else if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleOpenBook = useCallback(() => {
    if (animating || bookOpened) return;
    setAnimating(true);
    window.history.pushState({ portfolio: true }, "", "#portfolio");

    if (prefersReducedMotion) {
      setBookOpened(true);
      setAnimating(false);
      return;
    }
    setTimeout(() => {
      setBookOpened(true);
      setAnimating(false);
    }, 1500);
  }, [animating, bookOpened, prefersReducedMotion]);

  const handleCloseBook = useCallback(() => {
    if (animating || !bookOpened) return;
    setAnimating(true);
    window.history.back();

    if (prefersReducedMotion) {
      setBookOpened(false);
      setAnimating(false);
      return;
    }
    setTimeout(() => {
      setBookOpened(false);
      setAnimating(false);
    }, 1500);
  }, [animating, bookOpened, prefersReducedMotion]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && bookOpened && !animating) {
        handleCloseBook();
      }
    };
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.portfolio) {
        setBookOpened(true);
      } else {
        setBookOpened(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [bookOpened, animating, handleCloseBook]);

  useEffect(() => {
    if (!animating) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [bookOpened, animating]);

  return (
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>Michael Chandler | Design • Build • Luxury Construction</title>
        <meta name="description" content="30+ Years. $500M+ Built. Luxury residential and commercial construction across 4 states and internationally. One standard: Exceptional." />
      </Helmet>
      {/* Book animation overlay */}
      {animating && !prefersReducedMotion && (
        <div className="fixed inset-0 z-50 flex" role="presentation" aria-hidden="true">
          <div className={`w-1/2 h-full bg-charcoal origin-right transition-transform ${!bookOpened ? "animate-book-open-left" : "animate-book-close-left"}`} />
          <div className={`w-1/2 h-full bg-charcoal origin-left transition-transform ${!bookOpened ? "animate-book-open-right" : "animate-book-close-right"}`} />
        </div>
      )}

      {!bookOpened ? (
        <>
          <Header onPortfolioClick={handleOpenBook} />
          <Hero />
          <CredibilityBar />
          <About onPortfolioClick={handleOpenBook} />
          <Services />
          <ProcessSection />
          <BookCoverHero onOpenBook={handleOpenBook} />
          <Footer />
        </>
      ) : (
        <>
          {/* Portfolio view header */}
          <div className="sticky top-0 z-30 bg-foreground/95 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <button
                onClick={handleCloseBook}
                disabled={animating}
                className="flex items-center gap-2 text-background bg-background/10 hover:bg-background/20 px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group font-inter text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </button>
            </div>
          </div>
          <PortfolioGrid onClose={handleCloseBook} />
        </>
      )}
    </div>
  );
};

export default Index;
