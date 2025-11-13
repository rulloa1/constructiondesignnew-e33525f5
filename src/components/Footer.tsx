import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
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
            <div className="mb-4">
              <img 
                src={logo} 
                alt="Michael Chandler Logo" 
                className="h-12 w-auto mb-3"
              />
              <h3 className="text-xl font-playfair text-white mb-2">Michael Chandler</h3>
              <p className="text-gray-400 text-sm mb-4">Fine Construction & Design</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              37+ years of construction excellence in Spring, Texas. Delivering quality craftsmanship and exceptional service for residential and commercial projects.
            </p>
          </div>

          {/* Middle Column - Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Architectural Design
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Construction Management
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Project Planning
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Quality Assurance
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Spring, Texas</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <a href="tel:+14352377373" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  +1 (435) 237-7373
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:mike.rcccon@yahoo.com" className="text-gray-400 hover:text-amber-500 transition-colors text-sm break-all">
                  mike.rcccon@yahoo.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Michael Chandler Fine Construction & Design. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <nav className="flex gap-6">
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  About
                </a>
                <a 
                  href="#services" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Services
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Contact
                </a>
              </nav>
              
              <Button 
                onClick={() => {
                  const chatbot = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
                  if (chatbot) chatbot.click();
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white text-sm"
                size="sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Talk with Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};