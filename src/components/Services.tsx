import { Compass, Pencil, Hammer, ClipboardCheck, Shield, Leaf } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Compass,
    title: "Planning & Feasibility",
    description: "Strategic planning to ensure project viability",
    items: [
      "Feasibility Studies",
      "Site Analysis",
      "Permitting & Entitlements",
      "Financial Planning"
    ]
  },
  {
    icon: Pencil,
    title: "Design",
    description: "Comprehensive design solutions",
    items: [
      "Architectural Design",
      "Interior Design",
      "Landscape Design",
      "3D Visualization"
    ]
  },
  {
    icon: Hammer,
    title: "Construction",
    description: "Expert execution and quality craftsmanship",
    items: [
      "Ground-Up Construction",
      "Renovations & Remodels",
      "Structural Work",
      "Finish Carpentry"
    ]
  },
  {
    icon: ClipboardCheck,
    title: "Project Management",
    description: "Seamless coordination from start to finish",
    items: [
      "Schedule Management",
      "Budget Control",
      "Vendor Coordination",
      "Progress Reporting"
    ]
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous standards and inspections",
    items: [
      "Quality Control",
      "Safety Compliance",
      "Code Compliance",
      "Final Inspections"
    ]
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Environmentally responsible practices",
    items: [
      "Green Building",
      "Energy Efficiency",
      "Sustainable Materials",
      "LEED Consulting"
    ]
  }
];

export const Services = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });
  // Duplicate services for seamless loop
  const duplicatedServices = [...services, ...services];

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`py-12 sm:py-16 bg-background overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 sm:mb-4 px-2">
            Comprehensive Construction & Development Services
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
            End-to-end expertise for projects of any scale or complexity
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex gap-6 animate-marquee">
            {duplicatedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 sm:w-80 bg-card border border-border rounded-lg shadow-md hover:shadow-[0_0_30px_rgba(228,179,33,0.4),0_0_60px_rgba(228,179,33,0.2)] transition-all duration-500 hover:-translate-y-2 hover:border-[#E4B321]/50"
                >
                  <div className="p-6 sm:p-8 h-full flex flex-col">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex-shrink-0 p-2 sm:p-3 rounded-lg bg-[#E4B321]/10">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#E4B321]" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-1 sm:mb-2">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Items List */}
                    <ul className="flex-grow space-y-3">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="text-[#E4B321] font-bold flex-shrink-0 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
