import React from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";

import { Portfolio } from "@/components/Portfolio";

import { Chatbot } from "@/components/Chatbot";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";
const Index: React.FC = () => {
  const location = useLocation();

  return <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Footer />
      <Chatbot />
    </div>;
};
export default Index;