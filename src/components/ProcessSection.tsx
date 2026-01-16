import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";

const phases = [
    {
        num: "01",
        title: "Discovery",
        subtitle: "The Foundation of Vision",
        description: "We start by listening. What's your vision? How do you live? What does success look like? Before a single line is drawn, we need to understand what we're solving for.",
        details: ["Client Lifestyle Audit", "Site Feasibility Study", "Budget & Timeline Alignment"]
    },
    {
        num: "02",
        title: "Design Development",
        subtitle: "Refining the Narrative",
        description: "Concepts become plans. We present options, refine based on your feedback, and don't move forward until the design feels right. This phase includes material selections, fixture choices, and detailed specifications.",
        details: ["3D Concept Visuals", "Material Mood Boards", "Regulatory Planning"]
    },
    {
        num: "03",
        title: "Pre-Construction",
        subtitle: "Precision Engineering",
        description: "Before breaking ground, we lock in every detail. Subcontractors are selected, schedules are built, and budgets are finalized. No surprises down the road.",
        details: ["Value Engineering", "Permit Management", "Final Trade Bidding"]
    },
    {
        num: "04",
        title: "Construction",
        subtitle: "Mastery in Action",
        description: "This is where our experience shows. Proactive communication, rigorous quality control, and problem-solving before issues become problems. You'll always know where your project stands.",
        details: ["Daily Project Oversight", "Structural Integrity Checks", "Transparent Reporting"]
    },
    {
        num: "05",
        title: "Delivery",
        subtitle: "The Final Handover",
        description: "We don't just hand over keys. We walk you through every system, ensure everything works perfectly, and remain available long after move-in.",
        details: ["System Education", "Final Quality Audit", "Lifetime Care Handover"]
    }
];

export const ProcessSection: React.FC = () => {
    const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

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

                <div className="relative">
                    {/* Horizontal Connector Line */}
                    <div className="hidden lg:block absolute top-[2.5rem] left-0 right-0 h-[1px] bg-charcoal/10 -z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-1 relative z-10">
                        {phases.map((phase, index) => (
                            <div
                                key={phase.num}
                                className={`relative cursor-pointer transition-all duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {/* Circle Node */}
                                <div className={`
                                    mb-6 lg:mb-10 w-20 h-20 flex items-center justify-center font-playfair text-2xl rounded-full mx-auto lg:mx-0 shadow-2xl transition-all duration-500 border-4 border-cream
                                    ${activeIndex === index ? 'bg-gold text-white scale-110 shadow-gold/20' : 'bg-charcoal text-white'}
                                `}>
                                    {phase.num}
                                </div>

                                <h3 className={`font-playfair text-xl text-charcoal mb-2 text-center lg:text-left transition-colors duration-300 ${activeIndex === index ? 'text-gold' : ''}`}>
                                    {phase.title}
                                </h3>
                                <p className="font-inter text-[10px] uppercase tracking-widest text-gold/60 text-center lg:text-left mb-4">
                                    {phase.subtitle}
                                </p>

                                {/* Active Detail Indicator (Mobile Connector) */}
                                <div className={`h-1 mx-auto lg:mx-0 w-12 bg-gold transition-all duration-500 rounded-full ${activeIndex === index ? 'scale-x-100' : 'scale-x-0'}`} />
                            </div>
                        ))}
                    </div>

                    {/* Active Phase Content Panel */}
                    <AnimatePresence mode="wait">
                        {activeIndex !== null && (
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="mt-16 bg-white/40 backdrop-blur-sm border border-charcoal/5 p-8 lg:p-12 rounded-2xl shadow-sm"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2">
                                        <h4 className="font-playfair text-3xl text-charcoal mb-6">{phases[activeIndex].title}</h4>
                                        <p className="font-inter text-lg text-charcoal/80 leading-relaxed mb-8">
                                            {phases[activeIndex].description}
                                        </p>
                                    </div>
                                    <div className="bg-cream/50 p-8 rounded-xl border border-charcoal/5">
                                        <h5 className="font-inter text-xs uppercase tracking-[0.2em] text-gold mb-6">Key Actions</h5>
                                        <ul className="space-y-4">
                                            {phases[activeIndex].details.map((detail, i) => (
                                                <li key={i} className="flex items-center gap-3 font-inter text-sm text-charcoal/70">
                                                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

