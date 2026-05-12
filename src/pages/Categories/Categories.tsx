import { type MouseEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useRequireLogin } from "../../hooks/useRequireLogin";
import { categoryProducts } from "../../data/categoryProducts";
import "./Categories.css";

type CategorySlug = "accessories" | "equipment";

const categoryInfo = {
  accessories: {
    title: "ACCESSORIES",
    eyebrow: "PeakFit essentials",
    subtitle: "Small details built to support every workout.",
    heroImage: "/assets/images/pages/Categories/accessories/accessories-hero-bg.png",
  },
  equipment: {
    title: "EQUIPMENT",
    eyebrow: "Training tools",
    subtitle: "Performance gear for strength, recovery, and daily training.",
    heroImage: "/assets/images/pages/Categories/equipment/equipment-hero-bg.png",
  },
} satisfies Record<CategorySlug, {
  title: string;
  eyebrow: string;
  subtitle: string;
  heroImage: string;
}>;

function CategoryCard({ product }: { product: typeof categoryProducts[0] }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const requireLogin = useRequireLogin();
  const [imgIndex, setImgIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const wishlistItem = {
    id: product.id,
    name: product.name,
    image: product.images[0],
    price: product.price,
  };
  const liked = isInWishlist(product.id);

  const prev = (event: MouseEvent) => {
    event.stopPropagation();
    setImgIndex((index) => (index === 0 ? 2 : index - 1));
  };

  const next = (event: MouseEvent) => {
    event.stopPropagation();
    setImgIndex((index) => (index === 2 ? 0 : index + 1));
  };

  return (
    <article className="cat-card">
      <div
        className="cat-card-img-wrap"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link className="cat-card-link" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <img className="cat-card-img" src={product.images[imgIndex]} alt={product.name} />
        </Link>

        {product.isNew && <span className="cat-badge-new">NEW</span>}

        <button
          className="cat-wishlist"
          type="button"
          aria-label="Add to wishlist"
          onClick={(event) => {
            event.stopPropagation();
            if (!requireLogin("Sign in to save items to your wishlist.")) return;
            toggleWishlist(wishlistItem);
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

        <div className={`cat-card-hover${hovered ? " visible" : ""}`}>
          <div className="cat-card-hover-arrows">
            <button className="cat-arrow" type="button" onClick={prev} aria-label="Previous image">
              &lsaquo;
            </button>
            <button className="cat-arrow" type="button" onClick={next} aria-label="Next image">
              &rsaquo;
            </button>
          </div>
          <div className="cat-card-hover-bottom">
            <Link className="cat-shop-now" to={`/products/${product.id}`}>
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      <div className="cat-card-info">
        <p className="cat-card-name">{product.name}</p>
        <p className="cat-card-price">{product.price}</p>
      </div>
    </article>
  );
}

function Categories() {
  const { categorySlug } = useParams();

  if (!categorySlug) {
    return (
      <main className="cat-page">
        <section className="cat-picker">
          <div className="cat-picker-content">
            <p className="cat-hero-eyebrow">Choose your path</p>
            <h1 className="cat-hero-title">CATEGORIES</h1>
            <p className="cat-hero-sub">
              Explore workout essentials by category and find the gear that fits your training.
            </p>
          </div>

          <div className="cat-picker-grid">
            <Link className="cat-picker-card" to="/categories/accessories">
              <img src="/assets/images/footer/accessories.jpg" alt="Accessories" />
              <div>
                <span>PeakFit essentials</span>
                <h2>Accessories</h2>
              </div>
            </Link>

            <Link className="cat-picker-card" to="/categories/equipment">
              <img src="/assets/images/footer/equipment.jpg" alt="Equipment" />
              <div>
                <span>Training tools</span>
                <h2>Equipment</h2>
              </div>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (categorySlug !== "accessories" && categorySlug !== "equipment") {
    return <Navigate to="/categories/accessories" replace />;
  }

  const info = categoryInfo[categorySlug];
  const products = categoryProducts.filter((product) => product.category === categorySlug);

  return (
    <main className="cat-page">
      <section className="cat-hero">
        <img className="cat-hero-img" src={info.heroImage} alt="" />
        <div className="cat-hero-overlay" />

        <div className="cat-hero-content">
          <p className="cat-hero-eyebrow">{info.eyebrow}</p>
          <h1 className="cat-hero-title">{info.title}</h1>
          <p className="cat-hero-sub">{info.subtitle}</p>
        </div>
      </section>

      <section className="cat-products">
        <div className="cat-filter-bar">
          <h2 className="cat-filter-title">{info.title}</h2>
        </div>

        <div className="cat-grid-wrap">
          <div className="cat-grid">
            {products.map((product) => (
              <CategoryCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Categories;
