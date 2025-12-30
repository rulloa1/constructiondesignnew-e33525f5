import React, { useCallback } from "react";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "@/assets/mc-logo-new.png";

const navigation = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Design", href: "/design" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "/contact" },
];

interface HeaderProps {
  onPortfolioClick?: () => void;
}

export const Header = React.memo(({ onPortfolioClick }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, itemName: string) => {
    // If clicking Portfolio, navigate to portfolio page
    if (itemName === "Portfolio") {
      e.preventDefault();
      navigate('/portfolio');
      return;
    }

    // If clicking Design, navigate to design page
    if (itemName === "Design") {
      e.preventDefault();
      navigate('/design');
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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-charcoal/80 shadow-lg transition-all duration-300 border-b border-white/5">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group">
            <img src={logo} alt="Michael Chandler logo" className="h-16 w-auto transition-all duration-300 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href, item.name)}
                className="relative text-sm font-inter font-light tracking-wide text-white transition-all duration-300 drop-shadow-md hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full leading-relaxed"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <AlignJustify className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href, item.name)}
                    className="text-lg font-inter font-light tracking-wide hover:text-accent transition-colors leading-relaxed"
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
