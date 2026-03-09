import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="text-center px-6">
        <span className="font-playfair text-[10rem] leading-none text-gold/15 block -mb-8">
          404
        </span>
        <h1 className="font-playfair text-4xl text-charcoal mb-4">
          Page Not Found
        </h1>
        <p className="font-inter text-lg text-charcoal/60 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          asChild
          className="bg-charcoal hover:bg-gold text-white px-8 py-6 rounded-none uppercase tracking-widest font-inter text-sm transition-all duration-300"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
