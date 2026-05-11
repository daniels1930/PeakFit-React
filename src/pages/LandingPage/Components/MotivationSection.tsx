import "../styles/MotivationSection.css";
import ReusableButton from "./ReusableButton";
import { useNavigate } from "react-router-dom";

const MotivationSection = () => {
  const navigate = useNavigate();

  return (
    <section className="motivation-section">
      {/* GRID IMAGES */}
      <div className="motivation-grid"> 
        
        <div className="left-column">
          <img src="/assets/images/pages/LandingPage/5.png" alt="motivation" />

          <img src="/assets/images/pages/LandingPage/7.png" alt="motivation" />

        </div>

        <div className="right-column">

          <img src="/assets/images/pages/LandingPage/6.png" alt="motivation" />

          <img src="/assets/images/pages/LandingPage/8.png" alt="motivation" />

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="how-it-works">
        <h2>
          How Peak<span>Fit</span> Works
        </h2>

        <div className="steps-container">
          <div className="step-card">
            <h3>Step 1:</h3>

            <h4>Create Your Account</h4>

            <p>Sign up and join the PeakFit community in minutes.</p>
          </div>

          <div className="step-card">
            <h3>Step 2:</h3>

            <h4>List Your Products</h4>

            <p>Upload your fitness products and set your price easily.</p>
          </div>

          <div className="step-card">
            <h3>Step 3:</h3>

            <h4>Sell and Grow</h4>

            <p>Reach a fitness-focused audience and grow your brand.</p>
          </div>
        </div>
      </div>

      {/* VIDEO CTA */}
      <div className="motivation-video-container">
        <video autoPlay muted loop playsInline className="motivation-video">
          <source
            src="/assets/images/pages/LandingPage/gif3.mp4"
            type="video/mp4"
          />
        </video>

        <div className="motivation-button">
          <ReusableButton
            text="Start selling today"
            width="350px"
            onClick={() => navigate("/sell")}
          />
        </div>
      </div>
    </section>
  );
};

export default MotivationSection;
