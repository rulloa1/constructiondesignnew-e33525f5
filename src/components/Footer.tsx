import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/mc-logo-new.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#1a1f2e] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Brand */}
          <div>
            <div className="mb-6">
              <img 
                src={logo} 
                alt="Michael Chandler Logo" 
                className="h-12 w-auto mb-4"
              />
              <h3 className="text-2xl font-playfair font-light text-white mb-2 tracking-tight">Michael Chandler</h3>
              <p className="text-gray-400 text-base mb-4">Fine Construction & Design</p>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              37+ years of construction excellence in Spring, Texas. Delivering quality craftsmanship and exceptional service for residential and commercial projects.
            </p>
          </div>

          {/* Middle Column - Services */}
          <div>
            <h3 className="text-2xl font-playfair font-light mb-6 tracking-tight">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-gray-400 hover:text-accent transition-colors text-base">
                  Architectural Design
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-gray-400 hover:text-accent transition-colors text-base">
                  Construction Management
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-gray-400 hover:text-accent transition-colors text-base">
                  Project Planning
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-gray-400 hover:text-accent transition-colors text-base">
                  Quality Assurance
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact */}
          <div>
            <h3 className="text-2xl font-playfair font-light mb-6 tracking-tight">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-base">Spring, Texas</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a href="tel:+14352377373" className="text-gray-400 hover:text-accent transition-colors text-base">
                  +1 (435) 237-7373
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a href="mailto:mike.rcccon@yahoo.com" className="text-gray-400 hover:text-accent transition-colors text-base break-all">
                  mike.rcccon@yahoo.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-base">
              © {currentYear} Michael Chandler Fine Construction & Design. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <nav className="flex gap-6">
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  className="text-gray-400 hover:text-accent transition-colors text-base"
                >
                  About
                </a>
                <a 
                  href="#services" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="text-gray-400 hover:text-accent transition-colors text-base"
                >
                  Services
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                  className="text-gray-400 hover:text-accent transition-colors text-base"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};