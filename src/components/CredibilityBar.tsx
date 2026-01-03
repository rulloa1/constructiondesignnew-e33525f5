import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
    { label: "Experience", value: "30+ Years" },
    { label: "Portfolio", value: "$500M+" },
    { label: "Reach", value: "4 States + Int'l" },
    { label: "Expertise", value: "Res • Com • Hosp" },
];

export const CredibilityBar: React.FC = () => {
    const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <div
            ref={elementRef as React.RefObject<HTMLDivElement>}
            className="bg-charcoal border-y border-gold/20 py-8 lg:py-12"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`text-center transition-all duration-700 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                        >
                            <p className="font-playfair text-2xl lg:text-3xl text-gold mb-1 font-semibold tracking-tight">
                                {stat.value}
                            </p>
                            <p className="font-inter text-[10px] lg:text-xs text-white/50 uppercase tracking-[0.2em]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
