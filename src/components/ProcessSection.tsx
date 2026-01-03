import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const phases = [
    {
        num: "01",
        title: "Discovery",
        description: "We start by listening. What's your vision? How do you live? What does success look like? Before a single line is drawn, we need to understand what we're solving for."
    },
    {
        num: "02",
        title: "Design Development",
        description: "Concepts become plans. We present options, refine based on your feedback, and don't move forward until the design feels right. This phase includes material selections, fixture choices, and detailed specifications."
    },
    {
        num: "03",
        title: "Pre-Construction",
        description: "Before breaking ground, we lock in every detail. Subcontractors are selected, schedules are built, and budgets are finalized. No surprises down the road."
    },
    {
        num: "04",
        title: "Construction",
        description: "This is where our experience shows. Proactive communication, rigorous quality control, and problem-solving before issues become problems. You'll always know where your project stands."
    },
    {
        num: "05",
        title: "Delivery",
        description: "We don't just hand over keys. We walk you through every system, ensure everything works perfectly, and remain available long after move-in."
    }
];

export const ProcessSection: React.FC = () => {
    const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section
            id="process"
            ref={elementRef as React.RefObject<HTMLElement>}
            className="py-20 lg:py-32 bg-cream overflow-hidden selection:bg-gold selection:text-white"
        >
            <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className={`mb-20 lg:mb-32 text-center lg:text-left transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}>
                    <span className="font-playfair text-9xl lg:text-[12rem] text-gold/5 font-light leading-none block -mb-8 lg:-mb-16 select-none">
                        Process
                    </span>
                    <div className="relative z-10">
                        <p className="font-inter text-xs tracking-[0.4em] text-gold uppercase mb-4 pl-1">The Journey</p>
                        <h2 className="font-playfair text-5xl lg:text-6xl text-charcoal">How We Work</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 relative">
                    {/* Vertical line connector for desktop */}
                    <div className="hidden lg:block absolute top-[2.5rem] left-0 right-0 h-[1px] bg-charcoal/10 -z-10" />

                    {phases.map((phase, index) => (
                        <div
                            key={phase.num}
                            className={`relative group bg-white/40 lg:bg-transparent p-6 lg:p-0 rounded-xl lg:rounded-none border border-charcoal/5 lg:border-none transition-all duration-700 delay-${index * 150} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                }`}
                        >
                            <div className="mb-6 lg:mb-10 w-16 h-16 bg-charcoal text-white flex items-center justify-center font-playfair text-2xl rounded-full mx-auto lg:mx-0 shadow-2xl group-hover:bg-gold group-hover:scale-110 transition-all duration-500 relative z-20 border-4 border-cream">
                                {phase.num}
                            </div>
                            <h3 className="font-playfair text-2xl text-charcoal mb-4 text-center lg:text-left group-hover:text-gold transition-colors duration-300">
                                {phase.title}
                            </h3>
                            <p className="font-inter text-sm text-charcoal/70 leading-relaxed text-center lg:text-left border-t lg:border-t-0 border-charcoal/10 pt-4 lg:pt-0">
                                {phase.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
