import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { menProducts } from "../../data/menProducts";
import "./MenCollection.css";

const heroSlides = [
  { image: "/assets/images/pages/MenCollection/mc-hero-1.png" },
  { image: "/assets/images/pages/MenCollection/mc-hero-2.png" },
  { image: "/assets/images/pages/MenCollection/mc-hero-3.png" },
];

type FilterTab = "all" | "clothing" | "accessories" | "supplements";

const emptyMessages: Record<Exclude<FilterTab, "all">, string> = {
  clothing: "No clothing available for men yet.",
  accessories: "No accessories available for men yet.",
  supplements: "No supplements available for men yet.",
};

function ProductCard({ product }: { product: typeof menProducts[0] }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const prev = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImgIndex((index) => (index === 0 ? 2 : index - 1));
  };

  const next = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImgIndex((index) => (index === 2 ? 0 : index + 1));
  };

  return (
    <article className="mc-card">
      <div
        className="mc-card-img-wrap"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link className="mc-card-link" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <img className="mc-card-img" src={product.images[imgIndex]} alt={product.name} />
        </Link>

        {product.isNew && <span className="mc-badge-new">NEW</span>}

        <button
          className="mc-wishlist"
          type="button"
          aria-label="Add to wishlist"
          onClick={(event) => {
            event.stopPropagation();
            setLiked((value) => !value);
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

        <div className={`mc-card-hover${hovered ? " visible" : ""}`}>
          <div className="mc-card-hover-arrows">
            <button className="mc-arrow" type="button" onClick={prev} aria-label="Previous image">
              &lsaquo;
            </button>
            <button className="mc-arrow" type="button" onClick={next} aria-label="Next image">
              &rsaquo;
            </button>
          </div>
          <div className="mc-card-hover-bottom">
            <Link className="mc-shop-now" to={`/products/${product.id}`}>
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      <div className="mc-card-info">
        <p className="mc-card-name">{product.name}</p>
        <p className="mc-card-price">{product.price}</p>
      </div>
    </article>
  );
}

function MenCollection() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const productsRef = useRef<HTMLElement>(null);

  const filtered =
    activeTab === "all"
      ? menProducts
      : menProducts.filter((product) => product.category === activeTab);
  const emptyMessage =
    activeTab === "all" ? "No products available for men yet." : emptyMessages[activeTab];

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="mc-page">
      <section className="mc-hero">
        <img className="mc-hero-img" src={heroSlides[heroSlide].image} alt="" />
        <div className="mc-hero-overlay" />

        <div className="mc-hero-content">
          <h1 className="mc-hero-title">
            HIM PEAK <span>COLLECTION</span>
          </h1>
          <p className="mc-hero-sub">Performance, style, and strength all in one place.</p>
          <button className="mc-hero-btn" type="button" onClick={scrollToProducts}>
            <span>Today's Deals</span>
            <img className="mc-hero-btn-arrow" src="/assets/images/hero/flecha.png" alt="" />
          </button>
        </div>

        <button
          className="mc-hero-next"
          type="button"
          aria-label="Next slide"
          onClick={() => setHeroSlide((index) => (index + 1) % heroSlides.length)}
        >
          &rsaquo;
        </button>

        <div className="mc-hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`mc-hero-dot${index === heroSlide ? " active" : ""}`}
              type="button"
              onClick={() => setHeroSlide(index)}
            />
          ))}
        </div>
      </section>

      <section ref={productsRef} className="mc-products" id="mc-products">
        <div className="mc-filter-bar">
          <h2 className="mc-filter-title">MEN'S PRODUCTS</h2>
          <div className="mc-tabs">
            {(["all", "clothing", "accessories", "supplements"] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                className={`mc-tab${activeTab === tab ? " active" : ""}`}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mc-grid-wrap">
          {filtered.length > 0 ? (
            <div className="mc-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mc-empty-state">
              <p className="mc-empty-kicker">Coming soon</p>
              <h3>{emptyMessage}</h3>
              <p>We are still curating this section. Check back later for new PeakFit drops.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default MenCollection;
