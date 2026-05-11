import { Link } from "react-router-dom";
import PageBackButton from "../../components/PageBackButton/PageBackButton";
import { useWishlist } from "../../context/WishlistContext";
import "./Wishlist.css";

function Wishlist() {
  const { items, toggleWishlist } = useWishlist();

  return (
    <main className="wishlist-page">
      <PageBackButton />

      <section className="wishlist-header">
        <button type="button" className="wishlist-title">
          Wishlist

          <img
            src="/assets/images/pages/WomenCollection/heart-filled.png"
            alt=""
          />
        </button>
      </section>

      {items.length === 0 ? (
        <p className="wishlist-empty">You don&apos;t have any favorites yet</p>
      ) : (
        <section className="wishlist-grid">
          {items.map((product) => (
            <article key={product.id} className="wishlist-card">
              <div className="wishlist-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wishlist-product-image"
                />

                <button
                  type="button"
                  className="wishlist-favorite-btn"
                  aria-label="Remove from favorites"
                  onClick={() => toggleWishlist(product)}
                >
                  <img
                    src="/assets/images/pages/WomenCollection/heart-filled.png"
                    alt=""
                    className="wishlist-favorite"
                  />
                </button>
              </div>

              <div className="wishlist-content">
                <h2>{product.name}</h2>

                <div className="wishlist-footer">
                  <span>{product.price}</span>

                  <Link className="wishlist-shop-link" to={`/products/${product.id}`}>
                    Shop Now

                    <img
                      src="/assets/images/hero/flecha.png"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Wishlist;
