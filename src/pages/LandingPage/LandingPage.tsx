import "./LandingPage.css";

import HeroSection from "./Components/HeroSection";
import AboutSection from "./Components/AboutSection";
import OfferSection from "./Components/OfferSection";
import MotivationSection from "./Components/MotivationSection";

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
