import { useNavigate } from 'react-router-dom';
import './MyOrders.css';

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
  const navigate = useNavigate();

  return (
    <div className="mo-page">

      {/* Perfil */}
      <div className="mo-perfil">

        <div className="mo-avatar">M</div>

        <h2 className="mo-nombre-usuario">Mateo</h2>

        <span className="mo-editar">
          Edit profile ↗
        </span>

        <div className="mo-botones">

          {/* Wishlist */}
          <button className="mo-btn mo-btn-inactivo">
            Wishlist ♡
          </button>

          {/* Botón activo */}
          <button className="mo-btn mo-btn-activo">
            My Orders
          </button>

          {/* Navega a My Products */}
          <button
            className="mo-btn mo-btn-inactivo"
            onClick={() => navigate('/my-products')}
          >
            My purchases
          </button>

        </div>
      </div>

      {/* Lista */}
      <div className="mo-lista">

        {pedidos.map((p) => (

          <div key={p.id} className="mo-tarjeta">

            <p className="mo-fecha">
              {p.fecha}
            </p>

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

                <p className="mo-llegada">
                  {p.llegada}
                </p>

                <p className="mo-nombre-prod">
                  {p.nombre}
                </p>

              </div>

              <div className="mo-acciones">

                <button className="mo-btn-accion mo-btn-ver">
                  View purchase
                </button>

                <button className="mo-btn-accion mo-btn-recomprar">
                  Repurchase
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyOrders;