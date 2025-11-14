import { Lightbulb, Star, ArrowDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";

interface AboutProps {
  onPortfolioClick?: () => void;
}

export const About = ({
  onPortfolioClick
}: AboutProps) => {
  const {
    elementRef,
    isVisible
  } = useScrollAnimation({
    threshold: 0.15
  });

  const {
    elementRef: headingRef,
    isVisible: headingVisible
  } = useScrollAnimation({
    threshold: 0.3
  });

  return (
    <section 
      id="about" 
      ref={elementRef as React.RefObject<HTMLElement>} 
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 
            ref={headingRef as React.RefObject<HTMLHeadingElement>}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold text-center mb-10 sm:mb-12 md:mb-16 text-foreground leading-tight transition-all duration-1000 ${
              headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            About Me
          </h2>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto mb-8 sm:mb-12">
            {/* Left Column - Main Text with Border */}
            <div className="border-l-4 border-amber-500 pl-6 sm:pl-8 py-4">
              <div className="space-y-4 sm:space-y-5 text-base sm:text-lg font-inter leading-relaxed text-foreground/90">
                <p className="leading-relaxed">
                  Through my experience of <span className="font-semibold text-foreground">37 years</span> as a Business, Design, and Construction professional, I have found that exceptional results come from exceptional teams.
                </p>
                <p className="leading-relaxed">
                  My approach is simple: bring together the right people, create an environment built on mutual respect, and stay closely attuned to client feedback throughout every phase of a project. I've built my career on the universal business principle that quality construction isn't just about meeting standards—it's about exceeding them by combining rigorous processes with forward-thinking design and fostering a collaborative team culture. Excellence is no longer simply a goal, but an inevitable result.
                </p>
                <p className="italic text-foreground/70 font-inter leading-relaxed">
                  -Michael Chandler
                </p>
              </div>
            </div>

            {/* Right Column - Cards */}
            <div className="space-y-6 sm:space-y-8">
              {/* Philosophy Card */}
              <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-foreground mb-3 sm:mb-4 leading-tight">
                        My Philosophy
                      </h3>
                      <p className="text-foreground/80 leading-relaxed font-inter text-sm sm:text-base">
                        Superior construction is accomplished through three core elements: assembling the right group of people, empowering them with respect and environment, and providing supportive leadership with real-time feedback.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Commitment Card */}
              <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-foreground mb-3 sm:mb-4 leading-tight">
                        My Commitment
                      </h3>
                      <p className="text-foreground/80 leading-relaxed font-inter text-sm sm:text-base">
                        Every client, every project, every time: I'm dedicated to exceeding expectations under all conditions. It's not just a goal—it's the standard by which I measure success.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Arrow pointing to Portfolio */}
          {onPortfolioClick && (
            <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
              <button 
                onClick={onPortfolioClick} 
                className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer group" 
                aria-label="View Portfolio"
              >
                <span className="text-lg sm:text-xl font-playfair font-semibold text-accent leading-relaxed">
                  View My Work
                </span>
                <ArrowDown size={48} className="text-accent animate-bounce group-hover:animate-none" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
