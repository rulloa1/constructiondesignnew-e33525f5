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

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-playfair font-semibold text-center mb-8 text-charcoal opacity-0 animate-slide-in-left">About</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 opacity-0 animate-fade-in-up delay-200">
              <div className="space-y-6 text-lg font-inter font-light leading-relaxed text-charcoal/80">
                <p className="transition-all duration-300">
                  With over a decade of experience in design, I specialize in creating spaces
                  that seamlessly blend functionality with aesthetic excellence. My approach
                  centers on understanding the unique needs of each client and translating
                  their vision into reality.
                </p>
                <p className="transition-all duration-300">
                  Every project is an opportunity to push creative boundaries while maintaining
                  a commitment to timeless design principles. I believe great design should
                  enhance the way people live and work, creating environments that inspire
                  and endure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};