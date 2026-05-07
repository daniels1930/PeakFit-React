import { useState } from "react";
import "./Hero.css";

const slides = [
  {
    title: (
      <>
        NEW <span>COLLECTIONS</span>
        <br />
        BY TOP BRAND.
      </>
    ),
    image: "/assets/images/hero/hero-atleta-1.png",
  },
  {
    title: (
      <>
        PUSH YOUR <span>LIMITS</span>
        <br />
        EVERY DAY.
      </>
    ),
    image: "/assets/images/hero/hero-atleta-2.png",
  },
  {
    title: (
      <>
        GEAR UP FOR
        <br />
        <span>GREATNESS.</span>
      </>
    ),
    image: "/assets/images/hero/hero-atleta-3.png",
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  const scrollToCollections = () => {
    document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="hero-top-banner">The Lab of Performance.</div>

      <section className="hero" aria-label="Featured collections">
        <img className="hero-bg-logo" src="/assets/images/hero/hero-bg.png" alt="" />
        <img className="hero-atleta" src={slide.image} alt="" />

        <div className="hero-content">
          <p className="hero-aspire">Aspire to more</p>
          <h1 className="hero-titulo">{slide.title}</h1>

          <button className="hero-btn" type="button" onClick={scrollToCollections}>
            <span>See Now</span>
            <img className="hero-btn-flecha" src="/assets/images/hero/flecha.png" alt="" />
          </button>
        </div>

        <div className="hero-dots" aria-label="Hero slides">
          {slides.map((item, index) => (
            <button
              className={`hero-dot${index === activeSlide ? " active" : ""}`}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={index === activeSlide}
              key={item.image}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <div className="hero-bottom-banner">FIND YOUR PEAK, STAY THERE</div>
    </>
  );
}

export default Hero;
