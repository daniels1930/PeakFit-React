import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { womenProducts } from "../../data/womenProducts";
import "./WomenCollection.css";

const heroSlides = [
  { image: "/assets/images/pages/WomenCollection/wc-hero-1.png" },
  { image: "/assets/images/pages/WomenCollection/wc-hero-2.png" },
  { image: "/assets/images/pages/WomenCollection/wc-hero-3.png" },
];

type FilterTab = "all" | "clothing" | "accessories" | "supplements";

const emptyMessages: Record<Exclude<FilterTab, "all">, string> = {
  clothing: "No clothing available for women yet.",
  accessories: "No accessories available for women yet.",
  supplements: "No supplements available for women yet.",
};

function ProductCard({ product }: { product: typeof womenProducts[0] }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i === 0 ? 2 : i - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i === 2 ? 0 : i + 1));
  };

  return (
    <article className="wc-card">
      <div
        className="wc-card-img-wrap"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link className="wc-card-link" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <img className="wc-card-img" src={product.images[imgIndex]} alt={product.name} />
        </Link>

        {product.isNew && <span className="wc-badge-new">NEW</span>}

        <button
          className="wc-wishlist"
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.stopPropagation();
            setLiked((v) => !v);
          }}
        >
          <img
            src={
              liked
                ? "/assets/images/pages/WomenCollection/heart-filled.png"
                : "/assets/images/pages/WomenCollection/heart-empty.png"
            }
            alt={liked ? "Remove from wishlist" : "Add to wishlist"}
          />
        </button>
        <div className={`wc-card-hover${hovered ? " visible" : ""}`}>
          <div className="wc-card-hover-arrows">
            <button className="wc-arrow" type="button" onClick={prev} aria-label="Previous image">‹</button>
            <button className="wc-arrow" type="button" onClick={next} aria-label="Next image">›</button>
          </div>
          <div className="wc-card-hover-bottom">
            <Link className="wc-shop-now" to={`/products/${product.id}`}>SHOP NOW</Link>
          </div>
        </div>
      </div>

      <div className="wc-card-info">
        <p className="wc-card-name">{product.name}</p>
        <p className="wc-card-price">{product.price}</p>
      </div>
    </article>
  );
}
function WomenCollection() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const productsRef = useRef<HTMLElement>(null);

  const filtered =
    activeTab === "all"
      ? womenProducts
      : womenProducts.filter((p) => p.category === activeTab);
  const emptyMessage =
    activeTab === "all" ? "No products available for women yet." : emptyMessages[activeTab];

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="wc-page">
      <section className="wc-hero">
        <img className="wc-hero-img" src={heroSlides[heroSlide].image} alt="" />
        <div className="wc-hero-overlay" />

        <div className="wc-hero-content">
          <h1 className="wc-hero-title">
            HER PEAK <span>COLLECTION</span>
          </h1>
          <p className="wc-hero-sub">Performance, style, and strength all in one place.</p>
          <button className="wc-hero-btn" type="button" onClick={scrollToProducts}>
            <span>Today's Deals</span>
            <img className="wc-hero-btn-arrow" src="/assets/images/hero/flecha.png" alt="" />
          </button>
        </div>

        <button
          className="wc-hero-next"
          type="button"
          aria-label="Next slide"
          onClick={() => setHeroSlide((i) => (i + 1) % heroSlides.length)}
        >
          ›
        </button>

        <div className="wc-hero-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`wc-hero-dot${i === heroSlide ? " active" : ""}`}
              type="button"
              onClick={() => setHeroSlide(i)}
            />
          ))}
        </div>
      </section>
      <section ref={productsRef} className="wc-products" id="wc-products">
        <div className="wc-filter-bar">
          <h2 className="wc-filter-title">WOMEN'S PRODUCTS</h2>
          <div className="wc-tabs">
            {(["all", "clothing", "accessories", "supplements"] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                className={`wc-tab${activeTab === tab ? " active" : ""}`}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="wc-grid-wrap">
          {filtered.length > 0 ? (
            <div className="wc-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="wc-empty-state">
              <p className="wc-empty-kicker">Coming soon</p>
              <h3>{emptyMessage}</h3>
              <p>We are still curating this section. Check back later for new PeakFit drops.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default WomenCollection;
