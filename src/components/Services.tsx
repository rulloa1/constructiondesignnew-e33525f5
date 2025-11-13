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
  return <section id="services" ref={elementRef as React.RefObject<HTMLElement>} className="relative py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-light mb-6 text-foreground tracking-tight">
              Comprehensive Construction & Development Services
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto sm:text-lg text-center">                                                                                                                                                                  End-to-end expertise for projects of any scale or complexity                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
            const Icon = service.icon;
            return <Card key={service.title} className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{
              animation: isVisible ? `fade-in 0.6s ease-out ${index * 0.1}s forwards` : 'none',
              opacity: isVisible ? 1 : 0
            }}>
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-amber-600" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-foreground/70 mb-4 text-sm">
                      {service.description}
                    </p>

                    {/* Service Items */}
                    <ul className="space-y-2">
                      {service.items.map(item => <li key={item} className="flex items-start gap-2 text-foreground/80 text-sm">
                          <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </div>
    </section>;
};