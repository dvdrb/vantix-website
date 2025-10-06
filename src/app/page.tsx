import AboutUsSection from "./components/about-us-section";
import AchievementSection from "./components/achievements-section";
import ContactForm from "./components/contact-section";
import HeroSection from "./components/Hero-section";
import SolutionSection from "./components/solution-section";

const Mobile = () => {
  return (
    <div className="gap-22 flex flex-col">
      <HeroSection></HeroSection>
      <SolutionSection></SolutionSection>
      <AchievementSection></AchievementSection>
      <AboutUsSection></AboutUsSection>
      <ContactForm></ContactForm>
      <p className="text-secondary text-center mb-7 text-sm leading-normal">
        @2025 Soft&Mark all rights reserved
      </p>
    </div>
  );
};
export default Mobile;
