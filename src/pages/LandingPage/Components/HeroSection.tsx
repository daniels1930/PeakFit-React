import "../styles/HeroSection.css";
import ReusableButton from "./ReusableButton";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      {/* VIDEO */}
      <div className="hero-video-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        >
          <source
            src="/assets/images/pages/LandingPage/gif1.mp4"
            type="video/mp4"
          />
        </video>

        {/* OVERLAY */}
        <div className="hero-overlay">
          <h1>
            UNLEASH YOUR
            <br />
            <span>PEAK</span> POTENTIAL
          </h1>

          <ReusableButton
            text="Shop Now"
            width="260px"
            onClick={() => navigate("/categories")}
          />

          {/* GLASS */}
          <div className="hero-glass">
            <div className="glass-left">
              <h2>
                Train Hard. Sell Smart.
                <br />
                Grow Together.
              </h2>
            </div>

            <div className="glass-right">
              <p>
                The ultimate fitness marketplace where you can
                buy, sell, and grow within a powerful fitness
                community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TEXT */}
      <div className="hero-community-text">
        <p>
          Apparel, equipment, and supplements — all in one
          place.
        </p>

        <p>
          Built by the fitness community, for the fitness
          community.
        </p>
      </div>

      {/* CARDS */}
      <div className="hero-cards">
        <img
          src="/assets/images/pages/LandingPage/1.png"
          alt="card"
        />

        <img
          src="/assets/images/pages/LandingPage/2.png"
          alt="card"
        />

        <img
          src="/assets/images/pages/LandingPage/3.png"
          alt="card"
        />
      </div>

      {/* CTA */}
      <div className="hero-bottom-button">
        <ReusableButton
          text="Explore trending products"
          width="420px"
          onClick={() => navigate("/categories")}
        />
      </div>
    </section>
  );
};

export default HeroSection;