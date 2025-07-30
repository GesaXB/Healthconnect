'use client';

import Navbar from "./components/home/Navbar";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeatureSection";
import CtaSection from "./components/home/CtaSelection";
import Footer from "./components/home/Footer";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-poppins">
      <Navbar />
      <HeroSection containerVariants={containerVariants} itemVariants={itemVariants} />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
