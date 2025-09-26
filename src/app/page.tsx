"use client";

import { useEffect, useState } from "react";
import AboutSection from "./components/about-section";
import AchievementsSection from "./components/achievement-section";
import DataSightShowcase from "./components/datasight-section";
import DataSightHero from "./components/hero-section";
import NavigationMenu from "./components/ui/navigation-menu";
import PageLoader from "./components/ui/page-loader";
import { MobilePullToRefresh } from "./components/ui/mobile-interactions";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = "smooth";

    // Simulate loading time for assets and initial setup
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleRefresh = async () => {
    // Simulate refresh action
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageLoader loading={isLoading}>
      <MobilePullToRefresh onRefresh={handleRefresh}>
        <NavigationMenu currentSection={currentSection} />

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
      </MobilePullToRefresh>
    </PageLoader>
  );
}
