import heroImage from "@/assets/hero-mc-portfolio.png";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Michael Chandler Portfolio - Construction site leader"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-24">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-cream mb-4">
            30+ Years of Quality Craftsmanship
          </h2>
          <p className="text-xl text-cream/90 max-w-4xl mx-auto font-inter font-light">
            From architectural design to landscape restoration, explore our diverse portfolio of projects
          </p>
        </div>
      </div>
    </section>
  );
};
