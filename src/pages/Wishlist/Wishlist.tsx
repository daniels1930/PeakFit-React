import "./Wishlist.css";
import wishlistData from "./WishlistData.json";

function Wishlist() {
  return (
    <main className="wishlist-page">
      <button type="button" className="wishlist-back">
  <img
    src="/assets/images/pages/EditProfile/leftArrow.png"
    alt="Back"
  />

  <span>Back</span>
</button>

      <section className="wishlist-header">
        <button type="button" className="wishlist-title">
          Wishlist

          <img
            src="/assets/images/pages/Wishlist/WLfav.png"
            alt="Wishlist"
          />
        </button>
      </section>

      <section className="wishlist-grid">
        {wishlistData.map((product) => (
          <article key={product.id} className="wishlist-card">
            <div className="wishlist-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="wishlist-product-image"
              />

              <img
                src="/assets/images/pages/Wishlist/Favact.png"
                alt="Favorite"
                className="wishlist-favorite"
              />
            </div>

            <div className="wishlist-content">
              <h2>{product.name}</h2>

              <div className="wishlist-footer">
                <span>${product.price}</span>

                <button type="button">
                   Shop Now

                   <img
                    src="/assets/images/hero/flecha.png"
                    alt="Arrow"
                       />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Wishlist;