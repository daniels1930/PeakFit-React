import "./LandingPage.css";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import OfferSection from "./components/OfferSection";
import MotivationSection from "./components/MotivationSection";

const LandingPage = () => {
  return (
    <main className="landing-page">
      <HeroSection />
      <AboutSection />
      <OfferSection />
      <MotivationSection />
    </main>
  );
};

export default LandingPage;
