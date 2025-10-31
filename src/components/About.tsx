import { Award, CheckCircle, Lightbulb } from "lucide-react";
export const About = () => {
  return <section id="about" className="relative py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-12 text-foreground">Our Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 bg-card rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:border-accent/50">
              <Lightbulb className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Visionary Design</h3>
              <p className="text-muted-foreground">We don't just build; we craft environments. Our designs prioritize long-term value, sustainability, and aesthetic harmony, ensuring every space is both beautiful and highly functional.</p>
            </div>
            <div className="p-8 bg-card rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:border-accent/50">
              <CheckCircle className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Uncompromising Quality</h3>
              <p className="text-muted-foreground">With over 30 years in the industry, our reputation is built on meticulous attention to detail and a commitment to the highest standards of craftsmanship, from foundation to finish.</p>
            </div>
            <div className="p-8 bg-card rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:border-accent/50">
              <Award className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Client Partnership</h3>
              <p className="text-muted-foreground">We believe in a collaborative process. We work closely with our clients, providing transparent communication and expert guidance to bring their unique vision to life, on time and on budget.</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};