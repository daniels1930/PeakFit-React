// Mis compras
// Botón "My purchases"

import { useNavigate } from 'react-router-dom';
import './MyProducts.css';

const compras = [
  {
    id: 1,
    fecha: 'January 7, 2025',
    estado: 'Delivered',
    llegada: 'January 9th arrived',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    imagen: '/assets/images/pages/MyProducts/producto1.jpg',
  },
  {
    id: 2,
    fecha: 'January 7, 2025',
    estado: 'Delivered',
    llegada: 'January 9th arrived',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    imagen: '/assets/images/pages/MyProducts/producto2.jpg',
  },
  {
    id: 3,
    fecha: 'January 7, 2025',
    estado: 'Delivered',
    llegada: 'January 9th arrived',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    imagen: '/assets/images/pages/MyProducts/producto3.jpg',
  },
  {
    id: 4,
    fecha: 'January 7, 2025',
    estado: 'Delivered',
    llegada: 'January 9th arrived',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    imagen: '/assets/images/pages/MyProducts/producto4.jpg',
  },
];

function MyProducts() {
  const navigate = useNavigate();

  return (
    <div className="mp-page">

      {/* Perfil de Mateo */}
      <div className="mp-perfil">
        <div className="mp-avatar">M</div>
        <h2 className="mp-nombre-usuario">Mateo</h2>
        <span className="mp-editar">Edit profile ↗</span>

        <div className="mp-botones">
          <button className="mp-btn mp-btn-inactivo">Wishlist ♡</button>
          <button className="mp-btn mp-btn-inactivo" onClick={() => navigate('/my-orders')}>
            My Orders
          </button>
          <button className="mp-btn mp-btn-activo">My purchases</button>
        </div>
      </div>

      {/* Lista de compras */}
      <div className="mp-lista">
        {compras.map((c) => (
          <div key={c.id} className="mp-tarjeta">
            <p className="mp-fecha">{c.fecha}</p>
            <div className="mp-tarjeta-fila">
              <img src={c.imagen} alt={c.nombre} className="mp-imagen" />
              <div className="mp-info">
                <p className="mp-estado">
                  {c.estado} <span className="mp-check">✓</span>
                </p>
                <p className="mp-llegada">{c.llegada}</p>
                <p className="mp-nombre-prod">{c.nombre}</p>
              </div>
              <div className="mp-acciones">
                <button className="mp-btn-accion mp-btn-ver">View purchase</button>
                <button className="mp-btn-accion mp-btn-recomprar">Repurchase</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default MyProducts;
