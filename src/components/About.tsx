import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AboutProps {
  onPortfolioClick?: () => void;
}

export const About = ({ onPortfolioClick }: AboutProps) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      id="about"
      ref={elementRef as React.RefObject<HTMLElement>}
      className="relative py-20 lg:py-32 bg-cream"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <span className="font-playfair text-8xl lg:text-[10rem] text-gold/10 font-light leading-none block -mb-6 lg:-mb-12">
            02
          </span>
          <p className="font-inter text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3 text-center lg:text-left">Foundations</p>
          <h2 className="font-playfair text-4xl lg:text-5xl text-foreground text-center lg:text-left uppercase tracking-tight">Three Decades of <br className="hidden lg:block" /> Building What Matters</h2>
        </div>

        {/* Main Content Grid */}
        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* Left Column - Main Text */}
          <div className={`lg:col-span-7 transition-all duration-1000 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
            <div className="border-l-2 border-gold/40 pl-8 space-y-6">
              <p className="font-inter text-lg lg:text-xl text-foreground/90 leading-relaxed font-light">
                Michael Chandler Fine Construction & Design was founded on a simple belief: the best projects happen when design vision and construction expertise work hand-in-hand from day one.
              </p>
              <p className="font-inter text-foreground/70 leading-relaxed">
                Over 30+ years, we've built a portfolio exceeding $500 million across residential, commercial, and hospitality projects. Our work spans Texas, multiple U.S. states, and international locations—but our approach remains the same regardless of geography or project type.
              </p>
              <p className="font-inter text-foreground/70 leading-relaxed font-semibold text-gold uppercase tracking-widest text-sm">
                What Sets Us Apart:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-gold font-playfair font-bold">01</span>
                  <p className="font-inter text-sm text-foreground/70">
                    <strong className="text-foreground">Design-Build Integration:</strong> Architecture, interiors, and construction under one roof. No finger-pointing, no communication gaps.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-gold font-playfair font-bold">02</span>
                  <p className="font-inter text-sm text-foreground/70">
                    <strong className="text-foreground">Luxury Expertise:</strong> We specialize in high-end projects where details matter and "good enough" isn't in the vocabulary.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-gold font-playfair font-bold">03</span>
                  <p className="font-inter text-sm text-foreground/70">
                    <strong className="text-foreground">Relationships Over Transactions:</strong> Many of our clients have built multiple projects with us. That repeat trust is our greatest credential.
                  </p>
                </li>
              </ul>
              <p className="font-playfair text-lg italic text-foreground/60 pt-6 border-t border-gold/10">
                — Michael Chandler
              </p>
            </div>
          </div>

          {/* Right Column - Philosophy Cards */}
          <div className={`lg:col-span-5 space-y-6 transition-all duration-1000 delay-200 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
            {/* Philosophy Card */}
            <div className="bg-white p-8 shadow-premium border border-gold/5 group hover:border-gold/30 transition-all duration-500">
              <span className="font-playfair text-4xl text-gold/30 font-light block mb-4 group-hover:text-gold transition-colors">Philosophy</span>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed italic">
                "We're builders who understand design and designers who understand building. That integration eliminates the gaps where quality typically falls through."
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4 h-full">
              <div className="aspect-square w-full bg-charcoal p-1">
                <div className="w-full h-full border border-gold/30 flex flex-col items-center justify-center p-8 text-center space-y-6">
                  <p className="text-gold font-inter text-xs tracking-[0.3em] uppercase">Private Portfolio</p>
                  <h3 className="text-cream font-playfair text-2xl uppercase tracking-tighter">Explore Our <br /> Recent Works</h3>
                  <Button asChild className="bg-gold hover:bg-gold/90 text-white rounded-none w-full py-6 uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:scale-105">
                    <Link to="/portfolio">Enter Gallery</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
