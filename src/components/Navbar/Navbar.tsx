import { Link, NavLink } from "react-router-dom";
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
  return (
    <header className="header">
      <div className="top-header">
        <Link className="logo" to="/" aria-label="PeakFit home">
          <img src="/assets/images/Header/Logo.png" alt="PeakFit" />
        </Link>

        <form className="search-box">
          <input type="search" placeholder="Search products and more....." aria-label="Search products" />
          <button type="submit" aria-label="Search">
            <img src="/assets/images/Header/Lupa.png" alt="" />
          </button>
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
            Mateo
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
