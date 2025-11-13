import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer id="contact" className="py-12 sm:py-16 md:py-20 border-t border-white/10 bg-charcoal/70 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-semibold mb-6 sm:mb-8 text-center text-cream leading-tight">
            Get In Touch
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <Mail className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xs font-medium tracking-wider text-cream/60 mb-3 font-inter">
                EMAIL
              </h3>
              <a href="mailto:mike.rcccon@yahoo.com" className="text-base font-inter font-light text-cream hover:text-accent transition-all duration-300 hover:tracking-wide leading-relaxed">mike.rcccon@yahoo.com</a>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <Phone className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xs font-medium tracking-wider text-cream/60 mb-3 font-inter">
                PHONE
              </h3>
              <a href="tel:+14352377373" className="text-base font-inter font-light text-cream hover:text-accent transition-all duration-300 hover:tracking-wide leading-relaxed">+1 (435) 237-7373</a>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <MapPin className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-xs font-medium tracking-wider text-cream/60 mb-3 font-inter">
                LOCATION
              </h3>
              <p className="text-base font-inter font-light text-cream leading-relaxed">Spring, Texas</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 sm:pt-8 border-t border-border">
          <p className="text-sm font-inter font-light text-cream/70 leading-relaxed">
            © {currentYear} Michael Chandler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};