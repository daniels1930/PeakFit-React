import "../styles/AboutSection.css";
import ReusableButton from "./ReusableButton";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="about-section">
      <h2>WHO WE ARE</h2>

      <p className="about-description">
        PeakFit is more than an ecommerce platform. We are a
        fitness-driven community where anyone can buy, sell,
        and grow.
        <br />
        Our mission is to connect athletes, entrepreneurs, and
        fitness enthusiasts in one powerful digital ecosystem.
      </p>

      <div className="about-content">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="about-video"
        >
          <source
            src="/assets/images/pages/LandingPage/gif2.mp4"
            type="video/mp4"
          />
        </video>

        <div className="about-text-side">
          <h3>
            Our platform empowers anyone in the fitness world
            to buy, sell, and grow without limits.
          </h3>
        </div>
      </div>

      <div className="about-button">
        <ReusableButton
          text="Shop now"
          onClick={() => navigate("/categories")}
        />
      </div>
    </section>
  );
};

export default AboutSection;