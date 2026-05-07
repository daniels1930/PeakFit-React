import "./Navbar.css";

const quickLinks = [
  { image: "/assets/images/Header/Carrito.png", label: "cart", href: "#cart" },
  { image: "/assets/images/Header/Favoritos.png", label: "favorites", href: "#favorites" },
  { image: "/assets/images/Header/Campana.png", label: "notifications", href: "#notifications" },
];

const navLinks = ["Categories", "Offers", "Sell", "About Us", "Help/complaints"];

function Navbar() {
  return (
    <header className="header">
      <div className="top-header">
        <a className="logo" href="/" aria-label="PeakFit home">
          <img src="/assets/images/Header/Logo.png" alt="PeakFit" />
        </a>

        <form className="search-box">
          <input type="search" placeholder="Search products and more....." aria-label="Search products" />
          <button type="submit" aria-label="Search">
            <img src="/assets/images/Header/Lupa.png" alt="" />
          </button>
        </form>

        <div className="icons">
          {quickLinks.map((link) => (
            <a href={link.href} key={link.label} aria-label={link.label}>
              <img src={link.image} alt="" />
            </a>
          ))}
        </div>
      </div>

      <nav className="bottom-header" aria-label="Main navigation">
        <div className="nav-links">
          {navLinks.map((link) => (
            <a href={`#${link.toLowerCase().replaceAll(" ", "-")}`} key={link}>
              {link}
            </a>
          ))}
        </div>

        <div className="user-section">
          <a className="user-info" href="#user">
            <img src="/assets/images/Header/Usuario.png" alt="" />
            Mateo
          </a>
          <a className="my-products" href="#my-products">
            My products
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
