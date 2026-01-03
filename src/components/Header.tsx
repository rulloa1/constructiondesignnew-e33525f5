import React, { useCallback } from "react";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "@/assets/mc-logo-new.png";

const navigation = [
  { name: "Our Work", href: "/design" },
  { name: "About", href: "#about" },
  { name: "Process", href: "/process" },
  { name: "Contact", href: "/contact" },
];

interface HeaderProps {
  onPortfolioClick?: () => void;
}

export const Header = React.memo(({ onPortfolioClick }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, itemName: string) => {
    // If clicking Our Work, navigate to design page
    if (itemName === "Our Work") {
      e.preventDefault();
      navigate('/design');
      return;
    }

    // If clicking Process, navigate to process page
    if (itemName === "Process") {
      e.preventDefault();
      navigate('/process');
      return;
    }

    // If clicking Contact, navigate to contact page
    if (itemName === "Contact") {
      e.preventDefault();
      navigate('/contact');
      return;
    }

    // If clicking About from non-home page, navigate home first
    if (itemName === "About" && location.pathname !== "/") {
      e.preventDefault();
      navigate("/", { state: { scrollTo: "about" } });
      return;
    }

    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }, [navigate, location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-charcoal/85 shadow-premium transition-all duration-300 border-b border-white/10">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group">
            <img src={logo} alt="Michael Chandler logo" className="h-16 w-auto transition-all duration-500 group-hover:scale-110 drop-shadow-[0_2px_12px_rgba(208,165,102,0.4)] group-hover:drop-shadow-[0_4px_20px_rgba(208,165,102,0.7)]" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href, item.name)}
                className="relative text-sm font-inter font-light tracking-[0.08em] text-white/90 transition-all duration-300 drop-shadow-md hover:text-white hover:scale-105 after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-gold after:to-copper after:transition-all after:duration-300 hover:after:w-full leading-relaxed"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 transition-all duration-300">
                <AlignJustify className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="glass-dark border-white/10">
              <div className="flex flex-col gap-6 mt-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href, item.name)}
                    className="text-lg font-inter font-light tracking-wide text-white/90 hover:text-gold transition-all duration-300 leading-relaxed"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
});

Header.displayName = 'Header';
