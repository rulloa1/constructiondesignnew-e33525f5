import heroImage from "@/assets/hero-image-new.jpg";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern interior design showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/70" />
      </div>
      
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-6 lg:px-12 pb-20">
          <div className="max-w-3xl opacity-0 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-primary-foreground mb-6 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Creative Design
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground font-light max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-background/20 backdrop-blur-sm p-4 rounded-lg opacity-0 animate-fade-in-up delay-200">
              Crafting exceptional spaces through thoughtful design and meticulous attention to detail
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
