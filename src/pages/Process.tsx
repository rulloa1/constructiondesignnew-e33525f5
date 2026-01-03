import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProcessSection } from "@/components/ProcessSection";
import { Helmet } from "react-helmet-async";

const Process: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-cream">
            <Helmet>
                <title>Process | Michael Chandler | Luxury Construction</title>
                <meta name="description" content="Discover our proven construction and design process, from discovery to delivery." />
            </Helmet>
            <Header />
            <div className="pt-20">
                <ProcessSection />
            </div>
            <Footer />
        </div>
    );
};

export default Process;
