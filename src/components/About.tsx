import { Hammer, HardHat, Wrench, ArrowDown, Target, Award } from "lucide-react";
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
  return <section id="about" ref={elementRef as React.RefObject<HTMLElement>} className={`relative py-24 overflow-hidden bg-background transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      {/* Animated Construction Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Icons */}
        {[...Array(15)].map((_, i) => {
        const icons = [Hammer, HardHat, Wrench];
        const Icon = icons[i % 3];
        const delay = i * 0.8;
        const duration = 15 + i % 5 * 3;
        const size = 24 + i % 3 * 16;
        const startX = i * 7 % 100;
        const startY = i * 13 % 100;
        return <div key={i} className="absolute opacity-5" style={{
          left: `${startX}%`,
          top: `${startY}%`,
          animation: `float-diagonal ${duration}s ease-in-out ${delay}s infinite alternate`
        }}>
              <Icon size={size} className="text-accent" />
            </div>;
      })}
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float-diagonal {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -40px) rotate(90deg);
          }
          50% {
            transform: translate(-20px, -80px) rotate(180deg);
          }
          75% {
            transform: translate(-40px, -40px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold text-center mb-12 sm:mb-16 text-foreground opacity-0 animate-slide-in-left">
            About Me
          </h2>
          
          {/* Main intro section */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16 opacity-0 animate-fade-in-up delay-200">
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg font-inter font-light leading-relaxed text-foreground/90">
                  <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">I am Michael Chandler, and have been a construction professional who believes that exceptional results come from exceptional teams.</p>
                  <p>
                    My approach is simple: bring together the right people, create an environment built on mutual respect, and stay closely attuned to client feedback throughout every phase of a project.
                  </p>
                  <p>
                    I've built my career on the principle that quality construction isn't just about meeting standards—it's about exceeding them. By combining rigorous processes with forward-thinking design and fostering a collaborative team culture, I've found that excellence becomes not just achievable, but inevitable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Philosophy and Commitment Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Philosophy Card */}
            <Card className="opacity-0 animate-fade-in-up delay-300 bg-card/80 backdrop-blur-sm border-border shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-accent/10">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-semibold text-foreground mt-1 sm:mt-2">
                    My Philosophy
                  </h3>
                </div>
                <p className="text-sm sm:text-base md:text-lg font-inter font-light leading-relaxed text-foreground/80">
                  Superior construction is accomplished through three core elements: assembling the right group of people, empowering them with the respect and environment they need to thrive, and through supportive leadership, thoughtful course corrections based on real-time feedback from project owners and end users. When these elements align, teams don't just meet expectations—they consistently surpass them.
                </p>
              </CardContent>
            </Card>

            {/* Commitment Card */}
            <Card className="opacity-0 animate-fade-in-up delay-400 bg-card/80 backdrop-blur-sm border-border shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-accent/10">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-semibold text-foreground mt-1 sm:mt-2">
                    My Commitment
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg font-inter font-light leading-relaxed text-foreground/80">
                  <p>
                    Every client, every project, every time: I'm dedicated to exceeding expectations under all conditions. It's not just a goal—it's the standard by which I measure success.
                  </p>
                  <p>
                    Exceeding The Clients Expectations Every Time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Arrow pointing to Portfolio */}
          <div className="flex justify-center opacity-0 animate-fade-in delay-500">
            <button onClick={onPortfolioClick} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer group" aria-label="View Portfolio">
              <span className="text-lg font-playfair font-semibold text-accent">View My Work</span>
              <ArrowDown size={48} className="text-accent animate-bounce group-hover:animate-none" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>;
};