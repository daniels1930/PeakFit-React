import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageBackButton from "../../components/PageBackButton/PageBackButton";
import { useCart } from "../../context/CartContext";
import { catalogProductToWishlist, useWishlist } from "../../context/WishlistContext";
import { useRequireLogin } from "../../hooks/useRequireLogin";
import {
  fetchCatalogProducts,
  getCatalogProduct,
  getRelatedCatalogProducts,
  type CatalogProduct,
} from "../../data/productCatalog";
import { getInitialReviews, type ProductReview } from "../../data/productReviews";
import "./ProductDetail.css";

const REVIEWS_KEY_PREFIX = "peakfit_product_reviews";

function getReviewsKey(productId: string) {
  return `${REVIEWS_KEY_PREFIX}_${productId}`;
}

function readProductReviews(productId: string): ProductReview[] {
  try {
    const raw = localStorage.getItem(getReviewsKey(productId));
    if (!raw) return getInitialReviews(productId);
    const parsed = JSON.parse(raw) as ProductReview[];
    if (!Array.isArray(parsed)) return getInitialReviews(productId);
    return parsed.filter(
      (review) =>
        typeof review?.id === "string" &&
        typeof review.author === "string" &&
        typeof review.date === "string" &&
        typeof review.rating === "number" &&
        typeof review.title === "string" &&
        typeof review.body === "string"
    );
  } catch {
    return getInitialReviews(productId);
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="pd-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < rating ? "filled" : ""}>
          &#9733;
        </span>
      ))}
    </span>
  );
}

function ProductTile({ product }: { product: CatalogProduct }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const requireLogin = useRequireLogin();
  const liked = isInWishlist(product.id);

  return (
    <article className="pd-related-card">
      <Link to={`/products/${product.id}`} className="pd-related-image">
        <img src={product.images[0]} alt={product.name} />
        {product.collection !== "Home" && <span>NEW</span>}
        <button
          className="pd-related-wishlist"
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!requireLogin("Sign in to save items to your wishlist.")) return;
            toggleWishlist(catalogProductToWishlist(product));
          }}
        >
          <img
            className="pd-related-heart"
            src={
              liked
                ? "/assets/images/pages/WomenCollection/heart-filled.png"
                : "/assets/images/pages/WomenCollection/heart-empty.png"
            }
            alt=""
          />
        </button>
      </Link>
      <div className="pd-related-info">
        <p>{product.name}</p>
        <div>
          <strong>{product.price}</strong>
          <Link to={`/products/${product.id}`}>Shop Now</Link>
        </div>
      </div>
    </article>
  );
}

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addFromCatalog } = useCart();
  const requireLogin = useRequireLogin();
  const [product, setProduct] = useState<CatalogProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<CatalogProduct[]>([]);
  const [viewedProducts, setViewedProducts] = useState<CatalogProduct[]>([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [productError, setProductError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [question, setQuestion] = useState("");
  const [questionSent, setQuestionSent] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    let active = true;

    if (!productId) {
      setProduct(null);
      setLoadingProduct(false);
      return;
    }

    setLoadingProduct(true);
    setProductError("");

    getCatalogProduct(productId)
      .then(async (foundProduct) => {
        if (!active) return;
        setProduct(foundProduct);

        if (!foundProduct) {
          setRelatedProducts([]);
          setViewedProducts([]);
          return;
        }

        const [related, allProducts] = await Promise.all([
          getRelatedCatalogProducts(foundProduct),
          fetchCatalogProducts(),
        ]);

        if (!active) return;
        setRelatedProducts(related);
        setViewedProducts(
          allProducts
            .filter((item) => item.id !== foundProduct.id && item.category === foundProduct.category)
            .slice(0, 8)
        );
      })
      .catch(() => {
        if (!active) return;
        setProduct(null);
        setRelatedProducts([]);
        setViewedProducts([]);
        setProductError("This product is not available right now.");
      })
      .finally(() => {
        if (active) setLoadingProduct(false);
      });

    return () => {
      active = false;
    };
  }, [productId]);

  useEffect(() => {
    if (!product) {
      setReviews([]);
      return;
    }

    setSelectedImage(0);
    setQuestion("");
    setQuestionSent(false);
    setReviews(readProductReviews(product.id));
    setShowAddedToCart(false);
  }, [product]);

  useEffect(() => {
    if (!showAddedToCart) return;
    const timerId = window.setTimeout(() => setShowAddedToCart(false), 2800);
    return () => window.clearTimeout(timerId);
  }, [showAddedToCart]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    return reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  }, [reviews]);

  if (loadingProduct) {
    return (
      <main className="product-detail-page page-workspace">
        <p className="page-kicker">PeakFit product</p>
        <h1>Loading product...</h1>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-detail-page page-workspace">
        <p className="page-kicker">PeakFit product</p>
        <h1>Product not found</h1>
        <p>{productError || "This product is not available in the catalog."}</p>
        <Link className="page-action" to="/home">
          Back to shop
        </Link>
      </main>
    );
  }

  const liked = isInWishlist(product.id);

  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!question.trim()) {
      return;
    }

    setQuestion("");
    setQuestionSent(true);
  };

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!reviewName.trim() || !reviewTitle.trim() || !reviewBody.trim()) {
      return;
    }

    const newReview: ProductReview = {
      id: `${product.id}-user-review-${Date.now()}`,
      author: reviewName.trim(),
      date: "Just now",
      rating: reviewRating,
      title: reviewTitle.trim(),
      body: reviewBody.trim(),
    };

    setReviews((currentReviews) => {
      const nextReviews = [newReview, ...currentReviews];
      localStorage.setItem(getReviewsKey(product.id), JSON.stringify(nextReviews));
      return nextReviews;
    });
    setReviewName("");
    setReviewTitle("");
    setReviewBody("");
    setReviewRating(5);
  };

  return (
    <main className="product-detail-page">
      <div className="pd-shell">
        <PageBackButton className="pd-back-wrap" />

        <section className="pd-hero-card">
          <div className="pd-gallery">
            <div
              className="pd-main-image-frame"
              style={{ ["--pd-image" as string]: `url(${product.images[selectedImage]})` }}
            >
              <img className="pd-main-image" src={product.images[selectedImage]} alt={product.name} />
            </div>
            <div className="pd-thumbs">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  className={index === selectedImage ? "active" : ""}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="pd-summary">
            <button
              className="pd-heart"
              type="button"
              aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => {
                if (!requireLogin("Sign in to save items to your wishlist.")) return;
                toggleWishlist(catalogProductToWishlist(product));
              }}
            >
              <img
                src={
                  liked
                    ? "/assets/images/pages/WomenCollection/heart-filled.png"
                    : "/assets/images/pages/WomenCollection/heart-empty.png"
                }
                alt=""
              />
            </button>

            <p className="pd-kicker">{product.collection}</p>
            <h1>{product.name}</h1>
            <p className="pd-price">{product.price}</p>
            <div className="pd-rating">
              <Stars rating={Math.round(averageRating)} />
              <strong>{averageRating.toFixed(1)}</strong>
              <span>({reviews.length} reviews)</span>
            </div>

            <p className="pd-description">{product.description}</p>

            <div className="pd-highlights">
              <h2>What you need to know about this product:</h2>
              <ul>
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <button
              className="pd-shop"
              type="button"
              onClick={() => {
                if (!requireLogin("Sign in to shop and complete your purchase.")) return;
                addFromCatalog(product);
                navigate("/cart");
              }}
            >
              Shop Now <img src="/assets/images/hero/flecha.png" alt="" />
            </button>
            <button
              className={`pd-cart${showAddedToCart ? " pd-cart--added" : ""}`}
              type="button"
              aria-live="polite"
              onClick={() => {
                if (!requireLogin("Sign in to add items to your cart.")) return;
                addFromCatalog(product);
                setShowAddedToCart(true);
              }}
            >
              {showAddedToCart ? (
                <span className="pd-cart-label">Added</span>
              ) : (
                <>
                  <span className="pd-cart-label">Add to cart</span>
                  <img src="/assets/images/productos/shop_button.png" alt="" />
                </>
              )}
            </button>
          </div>
        </section>

        <section className="pd-section">
          <h2>Related products</h2>
          <div className="pd-carousel">
            {relatedProducts.map((item) => (
              <ProductTile key={item.id} product={item} />
            ))}
          </div>
        </section>

        <section className="pd-section pd-questions">
          <h2>Asks and questions</h2>
          <form onSubmit={submitQuestion}>
            <textarea
              value={question}
              onChange={(event) => {
                setQuestion(event.target.value);
                setQuestionSent(false);
              }}
              placeholder="Write your question..."
            />
            <button type="submit">Ask</button>
          </form>
          {questionSent && (
            <p className="pd-success-message">
              Your question has been sent and will be answered soon.
            </p>
          )}
        </section>

        <section className="pd-section pd-reviews-section">
          <div className="pd-reviews-heading">
            <div>
              <h2>Product reviews</h2>
              <p>
                {averageRating.toFixed(1)} <Stars rating={Math.round(averageRating)} />
              </p>
            </div>
          </div>

          <form className="pd-review-form" onSubmit={submitReview}>
            <input
              value={reviewName}
              onChange={(event) => setReviewName(event.target.value)}
              placeholder="Your name"
            />
            <input
              value={reviewTitle}
              onChange={(event) => setReviewTitle(event.target.value)}
              placeholder="Review title"
            />
            <select
              value={reviewRating}
              onChange={(event) => setReviewRating(Number(event.target.value))}
              aria-label="Review rating"
            >
              <option value={5}>5 stars</option>
              <option value={4}>4 stars</option>
              <option value={3}>3 stars</option>
              <option value={2}>2 stars</option>
              <option value={1}>1 star</option>
            </select>
            <textarea
              value={reviewBody}
              onChange={(event) => setReviewBody(event.target.value)}
              placeholder="Write your review..."
            />
            <button type="submit">Add review</button>
          </form>

          <div className="pd-review-grid">
            {reviews.map((review) => (
              <article className="pd-review-card" key={review.id}>
                <Stars rating={review.rating} />
                <h3>{review.title}</h3>
                <p>{review.body}</p>
                <div>
                  <span>{review.author}</span>
                  <small>{review.date}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        {viewedProducts.length > 0 && (
          <section className="pd-section">
            <h2>Those who viewed this product also bought</h2>
            <div className="pd-carousel">
              {viewedProducts.map((item) => (
                <ProductTile key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default ProductDetail;
