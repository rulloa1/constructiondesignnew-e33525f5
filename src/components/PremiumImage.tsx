import React, { useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface PremiumImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string;
    priority?: boolean;
    layoutId?: string;
    style?: React.CSSProperties;
}

export const PremiumImage: React.FC<PremiumImageProps> = ({
    src,
    alt,
    className = "",
    aspectRatio = "aspect-square",
    priority = false,
    layoutId,
    style
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <motion.div
            layoutId={layoutId}
            style={style}
            className={`relative overflow-hidden ${aspectRatio} ${className} bg-charcoal/5`}
        >
            {/* Loading State / Blur Placeholder */}
            {!isLoaded && !error && (
                <div className="absolute inset-0 z-0">
                    <Skeleton className="w-full h-full" />
                    <div className="absolute inset-0 bg-gold/5 backdrop-blur-3xl animate-pulse" />
                </div>
            )}

            {/* Main Image */}
            <motion.img
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                className={`
          w-full h-full object-cover transition-all duration-1000 ease-out professional-lighting
          ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-2xl'}
        `}
                onLoad={() => setIsLoaded(true)}
                onError={() => setError(true)}
            />

            {/* Glass Overlay on Hover (Optional/Implicit) */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
        </motion.div>
    );
};
