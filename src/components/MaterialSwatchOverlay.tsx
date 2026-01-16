import React from 'react';
import { motion } from 'framer-motion';

interface MaterialSwatchProps {
    materials: {
        name: string;
        color: string;
        description: string;
    }[];
}

export const MaterialSwatchOverlay: React.FC<MaterialSwatchProps> = ({ materials }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm flex flex-col justify-end p-6 transition-opacity duration-500"
        >
            <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Material Specification</p>
            <div className="space-y-4">
                {materials.map((m, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div
                            className="w-10 h-10 rounded-full border border-white/20 shadow-lg"
                            style={{ backgroundColor: m.color }}
                        />
                        <div>
                            <h4 className="font-playfair text-sm text-white">{m.name}</h4>
                            <p className="font-inter text-[10px] text-white/60">{m.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
