"use client";

import { useEffect } from "react";
import AboutSection from "./components/about-section";
import AchievementsSection from "./components/achievement-section";
import DataSightShowcase from "./components/datasight-section";
import DataSightHero from "./components/hero-section";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner
  }, []); // Empty dependency array ensures it runs only once on mount
  return (
    <>
      <DataSightHero />
      <AboutSection />
      <AchievementsSection />
      <DataSightShowcase />
    </>
  );
}
