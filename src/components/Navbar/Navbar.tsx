import { type FormEvent, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { normalizeSearch, searchCatalogProducts } from "../../data/searchProducts";
import "./Navbar.css";

const quickLinks = [
  { image: "/assets/images/Header/Carrito.png", label: "cart", to: "/cart" },
  { image: "/assets/images/Header/Favoritos.png", label: "wishlist", to: "/wishlist" },
  { image: "/assets/images/Header/Campana.png", label: "notifications", to: "/my-orders" },
] as const;

const quickLinkMessages: Record<(typeof quickLinks)[number]["label"], string> = {
  cart: "Sign in to view your cart and checkout.",
  wishlist: "Sign in to save products to your wishlist.",
  notifications: "Sign in to view your orders and updates.",
};

type NavLinkItem =
  | { label: string; to: string }
  | { label: string; to: string; guestTo: string; guestMessage: string };

const navLinks: NavLinkItem[] = [
  { label: "Categories", to: "/categories" },
  { label: "Offers", to: "/home" },
  {
    label: "Sell",
    to: "/seller-product/new",
    guestTo: "/login",
    guestMessage: "Sign in to list and sell your products on PeakFit.",
  },
  { label: "About Us", to: "/landing" },
  {
    label: "Help/complaints",
    to: "/profile",
    guestTo: "/login",
    guestMessage: "Sign in to access your profile and help options.",
  },
];

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
                        <small>
                          {product.collection} - {product.price}
                        </small>
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
          {user ? (
            quickLinks.map((link) => (
              <Link to={link.to} key={link.label} aria-label={link.label}>
                <img src={link.image} alt="" />
              </Link>
            ))
          ) : (
            <>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to="/login"
                  aria-label={link.label}
                  className="icons-guest-link"
                  state={{
                    guestNotice: quickLinkMessages[link.label],
                    from: `${location.pathname}${location.search}`,
                  }}
                >
                  <img src={link.image} alt="" />
                </Link>
              ))}
              <div className="navbar-auth">
                <Link className="navbar-auth-link" to="/login" state={{ from: `${location.pathname}${location.search}` }}>
                  Log in
                </Link>
                <Link className="navbar-auth-btn" to="/signup">
                  Sign up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <nav className={`bottom-header${user ? "" : " bottom-header-guest"}`} aria-label="Main navigation">
        <div className="nav-links">
          {navLinks.map((link) => {
            const to = "guestTo" in link && !user ? link.guestTo : link.to;
            const state =
              "guestTo" in link && !user
                ? {
                    guestNotice: link.guestMessage,
                    from: `${location.pathname}${location.search}`,
                  }
                : undefined;
            return (
              <NavLink key={link.label} to={to} state={state}>
                {link.label}
              </NavLink>
            );
          })}
        </div>

        {user ? (
          <div className="user-section">
            <Link className="user-info" to="/profile">
              <img src="/assets/images/Header/Usuario.png" alt="" />
              {user.name}
            </Link>
            <Link className="my-products" to="/my-products">
              My products
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}

export default Navbar;
