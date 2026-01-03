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
            className="py-20 lg:py-32 bg-white overflow-hidden"
        >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={`mb-16 lg:mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}>
                    <span className="font-playfair text-8xl lg:text-[10rem] text-gold/10 font-light leading-none block -mb-6 lg:-mb-12">
                        04
                    </span>
                    <p className="font-inter text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3 text-center lg:text-left">The Journey</p>
                    <h2 className="font-playfair text-4xl lg:text-5xl text-foreground text-center lg:text-left">How We Work</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 relative">
                    {/* Vertical line connector for desktop */}
                    <div className="hidden lg:block absolute top-12 left-0 right-0 h-[1px] bg-gold/20 -z-10" />

                    {phases.map((phase, index) => (
                        <div
                            key={phase.num}
                            className={`relative transition-all duration-700 delay-${index * 150} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                }`}
                        >
                            <div className="mb-6 lg:mb-10 w-12 h-12 lg:w-16 lg:h-16 bg-foreground text-white flex items-center justify-center font-playfair text-xl lg:text-2xl rounded-full mx-auto lg:mx-0 shadow-premium border-2 border-gold/30">
                                {phase.num}
                            </div>
                            <h3 className="font-playfair text-xl lg:text-2xl text-foreground mb-4 text-center lg:text-left">
                                {phase.title}
                            </h3>
                            <p className="font-inter text-sm text-muted-foreground leading-relaxed text-center lg:text-left">
                                {phase.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
