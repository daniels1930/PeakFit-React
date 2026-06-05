import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Collections from "../../components/Collections/Collections";
import Hero from "../../components/Hero/Hero";
import { fetchCatalogProducts, type CatalogProduct } from "../../data/productCatalog";
import { useRequireLogin } from "../../hooks/useRequireLogin";
import "./Home.css";
import "../../components/Products/Products.css";

function ProductGrid({ products }: { products: CatalogProduct[] }) {
  const requireLogin = useRequireLogin();

  return (
    <div className="grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <Link className="img-container" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
            <img className="img1" src={product.images[0]} alt={product.name} />
            <img className="img2" src={product.images[1]} alt="" />
          </Link>

          <div className="info">
            <p className="nombre">{product.name}</p>
            <p className="precio">{product.price}</p>
          </div>

          <button
            className="icono"
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => {
              if (!requireLogin("Sign in to add items to your cart.")) return;
            }}
          >
            <img src="/assets/images/productos/shop_button.png" alt="" />
          </button>
        </article>
      ))}
    </div>
  );
}

function CatalogProducts() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchCatalogProducts()
      .then((items) => {
        if (!active) return;
        setProducts(items.slice(0, 8));
        setError("");
      })
      .catch(() => {
        if (!active) return;
        setProducts([]);
        setError("Products are not available right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);

  return (
    <section className="productos" id="products">
      <h2 className="titulo">Top sports sellers</h2>

      {loading ? <p className="home-catalog-state">Loading products...</p> : null}
      {error ? <p className="home-catalog-state">{error}</p> : null}

      {firstRow.length > 0 && <ProductGrid products={firstRow} />}
      <Link className="view-all" to="/collections/women">
        View all
      </Link>

      {secondRow.length > 0 && <ProductGrid products={secondRow} />}
      <Link className="view-all" to="/collections/men">
        View all
      </Link>

      <div className="banner">BUY. SELL. TRAIN. GROW.</div>

      <div className="productos-hero">
        <img src="/assets/images/productos/onepeak.png" alt="One Peak campaign" />
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <Hero />
      <CatalogProducts />
      <Collections />

      <section className="home-brand">
        <div className="home-brand-logo">
          <img src="/assets/images/footer/logo.png" alt="PeakFit" />
        </div>
        <p>
          PeakFit is a fitness focused e-commerce and marketplace built for a driven and growing fit
          community. It&apos;s more than just an online store it&apos;s a platform where users can buy
          high quality gym accessories, apparel, supplements, and lifestyle products, while also selling
          their own fitness brands and creations. PeakFit connects passionate athletes, creators, and
          entrepreneurs in one powerful ecosystem designed to support performance, growth, and community.
        </p>
      </section>
    </main>
  );
}

export default Home;
