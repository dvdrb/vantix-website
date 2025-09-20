import AboutSection from "./components/about-section";
import AchievementsSection from "./components/achievement-section";
import DataSightShowcase from "./components/datasight-section";
import DataSightHero from "./components/hero-section";

export default function Home() {
  return (
    <>
      <DataSightHero />
      <AboutSection />
      <AchievementsSection />
      <DataSightShowcase />
    </>
  );
}
