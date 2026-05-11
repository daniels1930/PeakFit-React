import "../styles/OfferSection.css";

const OfferSection = () => {
  return (
    <section className="offer-section">
      <div className="offer-title">
        <h2>WHAT WE OFFER?</h2>
      </div>

      <img
        src="/assets/images/pages/LandingPage/4.png"
        alt="offer"
        className="offer-image"
      />

      <div className="offer-description">
        <p>
          At PeakFit, anyone can sell their fitness products.
        </p>

        <p>
          Whether you're a brand, entrepreneur, or athlete,
          this platform is your space to grow and monetize
          your passion.
        </p>
      </div>
    </section>
  );
};

export default OfferSection;