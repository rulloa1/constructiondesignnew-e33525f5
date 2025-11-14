import { Lightbulb, Ruler, Hammer, ClipboardList, ShieldCheck, Leaf, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Service {
  icon: typeof Lightbulb;
  title: string;
  description: string;
  items: string[];
}

const services: Service[] = [{
  icon: Lightbulb,
  title: "Planning & Feasibility",
  description: "Strategic planning to ensure project viability",
  items: ["Feasibility Studies", "Site Analysis", "Permitting & Entitlements", "Financial Planning"]
}, {
  icon: Ruler,
  title: "Design",
  description: "Comprehensive design solutions",
  items: ["Architectural Design", "Interior Design", "Landscape Design", "3D Visualization"]
}, {
  icon: Hammer,
  title: "Construction",
  description: "Expert execution and quality craftsmanship",
  items: ["Ground-Up Construction", "Renovations & Remodels", "Structural Work", "Finish Carpentry"]
}, {
  icon: ClipboardList,
  title: "Project Management",
  description: "Seamless coordination from start to finish",
  items: ["Schedule Management", "Budget Control", "Vendor Coordination", "Progress Reporting"]
}, {
  icon: ShieldCheck,
  title: "Quality Assurance",
  description: "Rigorous standards and inspections",
  items: ["Quality Control", "Safety Compliance", "Code Compliance", "Final Inspections"]
}, {
  icon: Leaf,
  title: "Sustainability",
  description: "Environmentally responsible practices",
  items: ["Green Building", "Energy Efficiency", "Sustainable Materials", "LEED Consulting"]
}];

export const Services = () => {
  const {
    elementRef,
    isVisible
  } = useScrollAnimation({
    threshold: 0.1
  });

  const {
    elementRef: headingRef,
    isVisible: headingVisible
  } = useScrollAnimation({
    threshold: 0.3
  });

  return (
    <section 
      id="services" 
      ref={elementRef as React.RefObject<HTMLElement>} 
      className="relative py-16 sm:py-20 md:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div 
            ref={headingRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
              headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold mb-4 sm:mb-5 md:mb-6 text-foreground tracking-tight leading-tight">
              Comprehensive Construction & Development Services
            </h2>
            <p className="text-base sm:text-lg font-inter text-foreground/70 max-w-3xl mx-auto text-center leading-relaxed">
              End-to-end expertise for projects of any scale or complexity
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.title} 
                  className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" 
                  style={{
                    animation: isVisible ? `fadeIn 0.6s ease-out ${index * 0.1}s forwards` : 'none',
                    opacity: isVisible ? 1 : 0
                  }}
                >
                  <CardContent className="p-6 sm:p-8">
                    {/* Icon */}
                    <div className="mb-4 sm:mb-5">
                      <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-amber-600" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-foreground mb-2 sm:mb-3 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-foreground/70 mb-4 sm:mb-5 text-sm sm:text-base font-inter leading-relaxed">
                      {service.description}
                    </p>

                    {/* Service Items */}
                    <ul className="space-y-2 sm:space-y-2.5">
                      {service.items.map(item => (
                        <li key={item} className="flex items-start gap-2 sm:gap-3 text-foreground/80 text-sm font-inter leading-relaxed">
                          <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
