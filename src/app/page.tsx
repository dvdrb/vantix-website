import AboutUsSection from "./components/about-us-section";
import AchievementSection from "./components/achievements-section";
import ContactForm from "./components/contact-section";
import HeroSection from "./components/Hero-section";
import SolutionSection from "./components/solution-section";

const Mobile = () => {
  return (
    <main id="main" role="main" className="gap-22 flex flex-col">
      <HeroSection />
      <SolutionSection />
      <AchievementSection />
      <AboutUsSection />
      <ContactForm />
      <p className="   text-gray-400 text-center mb-7 text-sm leading-normal">
        @2025 Soft&Mark all rights reserved
      </p>
    </main>
  );
};
export default Mobile;
