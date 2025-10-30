import { Hammer, HardHat, Wrench } from "lucide-react";

export const About = () => {
  return <section id="about" className="relative py-24 overflow-hidden bg-background">
      {/* Animated Construction Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Icons */}
        {[...Array(15)].map((_, i) => {
          const icons = [Hammer, HardHat, Wrench];
          const Icon = icons[i % 3];
          const delay = i * 0.8;
          const duration = 15 + (i % 5) * 3;
          const size = 24 + (i % 3) * 16;
          const startX = (i * 7) % 100;
          const startY = (i * 13) % 100;
          
          return (
            <div
              key={i}
              className="absolute opacity-5"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                animation: `float-diagonal ${duration}s ease-in-out ${delay}s infinite alternate`,
              }}
            >
              <Icon size={size} className="text-accent" />
            </div>
          );
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

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 opacity-0 animate-slide-in-left">
            About
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4 md:space-y-6 text-base md:text-lg font-light leading-relaxed text-foreground/80 opacity-0 animate-fade-in-up delay-200">
              <p className="transition-all duration-300 hover:text-foreground/90">
                With over a decade of experience in design, I specialize in creating spaces
                that seamlessly blend functionality with aesthetic excellence. My approach
                centers on understanding the unique needs of each client and translating
                their vision into reality.
              </p>
              <p className="transition-all duration-300 hover:text-foreground/90">
                Every project is an opportunity to push creative boundaries while maintaining
                a commitment to timeless design principles. I believe great design should
                enhance the way people live and work, creating environments that inspire
                and endure.
              </p>
            </div>
            
            <div className="space-y-8 opacity-0 animate-fade-in-up delay-400">
              <div className="transition-all duration-300 hover:translate-x-1">
                <h3 className="text-sm font-medium tracking-wider text-accent mb-3">
                  EXPERTISE
                </h3>
                <ul className="space-y-2 text-base md:text-lg font-light">
                  <li className="transition-colors duration-300 hover:text-accent">Residential Design</li>
                  <li className="transition-colors duration-300 hover:text-accent">Commercial Spaces</li>
                  <li className="transition-colors duration-300 hover:text-accent">Hospitality Projects</li>
                  <li className="transition-colors duration-300 hover:text-accent">Interior Architecture</li>
                </ul>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};