import { LayoutGrid, Handshake, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: LayoutGrid,
    title: "Design & Build",
    description: "From concept to completion, we manage the entire lifecycle of your project, ensuring seamless integration between architectural vision and construction execution.",
    details: [
      "Architectural & Interior Design",
      "3D Visualization & Planning",
      "Ground-Up Construction",
      "Renovations & Remodels",
    ]
  },
  {
    icon: Handshake,
    title: "Project Management",
    description: "Our expert project management ensures your project stays on track, on budget, and meets the highest standards of quality and safety.",
    details: [
      "Budget & Schedule Control",
      "Permitting & Compliance",
      "Vendor & Subcontractor Coordination",
      "Quality Assurance & Inspection",
    ]
  },
  {
    icon: TrendingUp,
    title: "Specialty Consulting",
    description: "Leverage our 30 years of experience for specialized consulting on feasibility, value engineering, and sustainable building practices.",
    details: [
      "Feasibility Studies & Site Analysis",
      "Sustainable & Green Building",
      "Structural & Finish Carpentry Expertise",
      "Long-Term Value Engineering",
    ]
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/5">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Our Core Services
          </h2>
          <p className="text-lg text-muted-foreground">
            End-to-end expertise, built on three decades of quality craftsmanship and project excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <Icon className="w-8 h-8 text-accent mb-6" />
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 text-sm text-foreground/80">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Request a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};
