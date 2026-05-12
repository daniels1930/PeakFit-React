// Link es como un <a> pero sin recargar la página, es de React Router
import { Link } from 'react-router-dom';
import PageBackButton from '../../components/PageBackButton/PageBackButton';
// myOrders es un array con los datos de las órdenes, viene de un archivo local
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
        {/* .map recorre el array myOrders y por cada orden crea una tarjeta */}
        {myOrders.map((p) => (

          // key identifica cada tarjeta de forma única para que React las maneje bien
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
                  {/* {' '} agrega un espacio entre el estado y el check */}
                  <span className="mo-check">✓</span>
                </p>
                <p className="mo-llegada">{p.deliverySummary}</p>
                <p className="mo-nombre-prod">{p.line.name}</p>
              </div>

              <div className="mo-acciones">
                {/* Link lleva al detalle de esa orden usando su id */}
                <Link to={`/my-orders/${p.id}`} className="mo-btn-accion mo-btn-ver">
                  View purchase
                </Link>

                {/* Link lleva al producto para comprarlo de nuevo usando el id del producto */}
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

//Link vs navigate — Link es como un botón que lleva a otra página, pero se escribe como etiqueta HTML directamente en el JSX. navigate en cambio se llama desde una función. Ambos cambian de página sin recargar.
// p.line.image y p.line.productId — cada orden p tiene adentro un objeto line con los datos del producto comprado. Es un objeto dentro de otro objeto.
// URLs dinámicas — `/my-orders/${p.id}` y `/products/${p.line.productId}` construyen rutas diferentes para cada orden o producto usando su id.