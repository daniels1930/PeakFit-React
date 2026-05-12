import { type FormEvent, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { normalizeSearch, searchCatalogProducts } from "../../data/searchProducts";
import "./Navbar.css";

const quickLinks = [
  { image: "/assets/images/Header/Carrito.png", label: "cart", to: "/cart" },
  { image: "/assets/images/Header/Favoritos.png", label: "wishlist", to: "/wishlist" },
  { image: "/assets/images/Header/Campana.png", label: "notifications", to: "/my-orders" },
];

const navLinks = [
  { label: "Categories", to: "/categories" },
  { label: "Offers", to: "/" },
  { label: "Sell", to: "/seller-product/new" },
  { label: "About Us", to: "/landing" },
  { label: "Help/complaints", to: "/profile" },
];

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const normalizedSearch = normalizeSearch(searchTerm);
  const searchResults = useMemo(() => {
    return searchCatalogProducts(normalizedSearch).slice(0, 5);
  }, [normalizedSearch]);

  const showSearchPanel = Boolean(normalizedSearch) && (searchFocused || hasSearched);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSearched(true);

    if (!normalizedSearch) {
      return;
    }

    setSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(normalizedSearch)}`);
  };

  return (
    <header className="header">
      <div className="top-header">
        <Link className="logo" to="/" aria-label="PeakFit home">
          <img src="/assets/images/Header/Logo.png" alt="PeakFit" />
        </Link>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search products and more....."
            aria-label="Search products"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setHasSearched(false);
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => {
              window.setTimeout(() => setSearchFocused(false), 120);
            }}
          />
          <button type="submit" aria-label="Search">
            <img src="/assets/images/Header/Lupa.png" alt="" />
          </button>

          {showSearchPanel && (
            <div className="search-panel">
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => (
                    <Link
                      className="search-result"
                      key={product.id}
                      to={`/products/${product.id}`}
                    >
                      <img src={product.images[0]} alt="" />
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.collection} - {product.price}</small>
                      </span>
                    </Link>
                  ))}
                  <Link
                    className="search-all-results"
                    to={`/search?q=${encodeURIComponent(normalizedSearch)}`}
                  >
                    View all results for "{searchTerm.trim()}"
                  </Link>
                </>
              ) : (
                <p className="search-empty">No products found</p>
              )}
            </div>
          )}
        </form>

        <div className="icons">
          {quickLinks.map((link) => (
            <Link to={link.to} key={link.label} aria-label={link.label}>
              <img src={link.image} alt="" />
            </Link>
          ))}
        </div>
      </div>

      <nav className="bottom-header" aria-label="Main navigation">
        <div className="nav-links">
          {navLinks.map((link) => (
            <NavLink to={link.to} key={link.label}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="user-section">
          <Link className="user-info" to="/profile">
            <img src="/assets/images/Header/Usuario.png" alt="" />
            {user?.name}
          </Link>
          <Link className="my-products" to="/my-products">
            My products
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
