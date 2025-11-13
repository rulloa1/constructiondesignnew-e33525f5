import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * PageLoader component - displays a centered loading spinner while pages are being lazy loaded
 * Used as a Suspense fallback for code-split routes
 */
const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-charcoal to-charcoal/90">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
        <p className="text-cream/80 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
