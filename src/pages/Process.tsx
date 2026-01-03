import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProcessSection } from "@/components/ProcessSection";

const Process: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-cream">
            <Header />
            <div className="pt-20">
                <ProcessSection />
            </div>
            <Footer />
        </div>
    );
};

export default Process;
