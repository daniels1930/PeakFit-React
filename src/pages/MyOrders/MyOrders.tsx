import { Link } from 'react-router-dom';
import PageBackButton from '../../components/PageBackButton/PageBackButton';
import { myOrders } from '../../data/myOrders';
import './MyOrders.css';
import '../Wishlist/Wishlist.css';

function MyOrders() {
  return (
    <main className="wishlist-page">
      <PageBackButton />

      <section className="wishlist-header">
        <div className="wishlist-title" role="presentation">
          My Orders
          <img
            src="/assets/images/pages/Profile/Truck.png"
            alt=""
          />
        </div>
      </section>

      <section className="wishlist-grid">
        {myOrders.map((p) => (
          <article key={p.id} className="mo-tarjeta">
            <p className="mo-fecha">{p.purchaseDate}</p>

            <div className="mo-tarjeta-fila">
              <img
                src={p.line.image}
                alt={p.line.name}
                className="mo-imagen"
              />

              <div className="mo-info">
                <p className="mo-estado">
                  {p.status}{' '}
                  <span className="mo-check">✓</span>
                </p>
                <p className="mo-llegada">{p.deliverySummary}</p>
                <p className="mo-nombre-prod">{p.line.name}</p>
              </div>

              <div className="mo-acciones">
                <Link to={`/my-orders/${p.id}`} className="mo-btn-accion mo-btn-ver">
                  View purchase
                </Link>
                <Link to={`/products/${p.line.productId}`} className="mo-btn-accion mo-btn-recomprar">
                  Repurchase
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default MyOrders;
