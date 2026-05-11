import PageBackButton from '../../components/PageBackButton/PageBackButton';
import './MyOrders.css';
import '../Wishlist/Wishlist.css';

const pedidos = [
  {
    id: 1,
    fecha: 'January 7, 2025',
    estado: 'Delivered',
    llegada: 'January 9th arrived',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    imagen: '/assets/images/pages/MyOrders/producto1.jpg',
  },
  {
    id: 2,
    fecha: 'January 7, 2025',
    estado: 'Delivered',
    llegada: 'January 9th arrived',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    imagen: '/assets/images/pages/MyOrders/producto2.jpg',
  },
  {
    id: 3,
    fecha: 'January 7, 2025',
    estado: 'Delivered',
    llegada: 'January 9th arrived',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    imagen: '/assets/images/pages/MyOrders/producto3.jpg',
  },
  {
    id: 4,
    fecha: 'January 7, 2025',
    estado: 'Delivered',
    llegada: 'January 9th arrived',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    imagen: '/assets/images/pages/MyOrders/producto4.jpg',
  },
];

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
        {pedidos.map((p) => (
          <article key={p.id} className="mo-tarjeta">
            <p className="mo-fecha">{p.fecha}</p>

            <div className="mo-tarjeta-fila">
              <img
                src={p.imagen}
                alt={p.nombre}
                className="mo-imagen"
              />

              <div className="mo-info">
                <p className="mo-estado">
                  {p.estado}{' '}
                  <span className="mo-check">✓</span>
                </p>
                <p className="mo-llegada">{p.llegada}</p>
                <p className="mo-nombre-prod">{p.nombre}</p>
              </div>

              <div className="mo-acciones">
                <button type="button" className="mo-btn-accion mo-btn-ver">
                  View purchase
                </button>
                <button type="button" className="mo-btn-accion mo-btn-recomprar">
                  Repurchase
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default MyOrders;
