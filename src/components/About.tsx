import { Lightbulb, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";

interface AboutProps {
  onPortfolioClick?: () => void;
}

export const About = ({ onPortfolioClick }: AboutProps) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.15
  });

  return (
    <section 
      id="about" 
      ref={elementRef as React.RefObject<HTMLElement>} 
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-semibold text-center mb-12 sm:mb-16 text-foreground">
            About Me
          </h2>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Left Column - Main Text with Border */}
            <div className="border-l-4 border-amber-500 pl-6 sm:pl-8 py-4">
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/90">
                <p>
                  Through my experience of <span className="font-semibold text-foreground">37 years</span> as a Business, Design, and Construction professional, I have found that exceptional results come from exceptional teams.
                </p>
                <p>
                  My approach is simple: bring together the right people, create an environment built on mutual respect, and stay closely attuned to client feedback throughout every phase of a project. I've built my career on the universal business principle that quality construction isn't just about meeting standards—it's about exceeding them.
                </p>
                <p className="italic text-foreground/70">
                  -Michael Chandler
                </p>
              </div>
            </div>

            {/* Right Column - Cards */}
            <div className="space-y-6">
              {/* Philosophy Card */}
              <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                        My Philosophy
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Superior construction is accomplished through three core elements: assembling the right group of people, empowering them with respect and environment, and providing supportive leadership with real-time feedback.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Commitment Card */}
              <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Star className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                        My Commitment
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        Every client, every project, every time: I'm dedicated to exceeding expectations under all conditions. It's not just a goal—it's the standard by which I measure success.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
