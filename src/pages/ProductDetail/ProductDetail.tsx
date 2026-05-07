import { Link, useParams } from "react-router-dom";
import { products } from "../../data/products";
import "./ProductDetail.css";

function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className="product-detail-page page-workspace">
        <p className="page-kicker">Persona 1</p>
        <h1>Product not found</h1>
        <p>Ese producto no existe en el catalogo.</p>
        <Link className="page-action" to="/">
          Back home
        </Link>
      </main>
    );
  }

  return (
    <main className="product-detail-page page-workspace">
      <p className="page-kicker">Persona 1</p>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="product-detail-price">{product.price}</p>
      <img className="product-detail-image" src={product.imagePrimary} alt={product.name} />
    </main>
  );
}

export default ProductDetail;
