import { Link } from "react-router-dom";
import { products } from "../../data/products";
import "./Products.css";

function Products() {
  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);

  return (
    <section className="productos" id="products">
      <h2 className="titulo">Top sports sellers</h2>

      <ProductGrid products={firstRow} />
      <button className="view-all" type="button">
        View all
      </button>

      <ProductGrid products={secondRow} />
      <button className="view-all" type="button">
        View all
      </button>

      <div className="banner">BUY. SELL. TRAIN. GROW.</div>

      <div className="productos-hero">
        <img src="/assets/images/productos/onepeak.png" alt="One Peak campaign" />
      </div>
    </section>
  );
}

type ProductGridProps = {
  products: typeof products;
};

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid">
      {products.map((product) => (
        <article className="product-card" key={product.name}>
          <Link className="img-container" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
            <img className="img1" src={product.imagePrimary} alt={product.name} />
            <img className="img2" src={product.imageSecondary} alt="" />
          </Link>

          <div className="info">
            <p className="nombre">{product.name}</p>
            <p className="precio">{product.price}</p>
          </div>

          <button className="icono" type="button" aria-label={`Add ${product.name} to cart`}>
            <img src="/assets/images/productos/shop_button.png" alt="" />
          </button>
        </article>
      ))}
    </div>
  );
}

export default Products;
