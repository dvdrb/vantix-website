"use client";

import { useEffect } from "react";
import AboutSection from "./components/about-section";
import AchievementsSection from "./components/achievement-section";
import DataSightShowcase from "./components/datasight-section";
import DataSightHero from "./components/hero-section";
import { ScrollTrackerGlass } from "./components/ui/scroll-tracker";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner
  }, []); // Empty dependency array ensures it runs only once on mount
  return (
    <>
      <ScrollTrackerGlass leftOffset="20" segmentHeight={36} />
      <div data-scroll-id="hero" id="hero">
        <DataSightHero />
      </div>
      <div data-scroll-id="about" id="about">
        <AboutSection />
      </div>
      <div data-scroll-id="achievements" id="achievements">
        <AchievementsSection />
      </div>
      <div data-scroll-id="solutions" id="solutions">
        <DataSightShowcase />
      </div>
    </>
  );
}
