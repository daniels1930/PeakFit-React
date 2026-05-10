// Se abre cuando el usuario hace clic en "Sell" del Navbar 

import { useNavigate } from 'react-router-dom';
import './SellerProduct.css';

const productos = [
  {
    id: 1,
    fecha: 'January 7, 2025',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    precio: 62.0,
    estado: 'sold',
    imagen: '/assets/images/pages/SellerProduct/producto1.jpg',
  },
  {
    id: 2,
    fecha: 'January 7, 2025',
    nombre: 'Hex Rubber Dumbbell with Chrome Handle Non-Slip Grip Professional Strength Training Black',
    precio: 62.0,
    estado: 'unsold',
    imagen: '/assets/images/pages/SellerProduct/producto2.jpg',
  },
];

function SellerProduct() {
  const navigate = useNavigate();

  return (
    <div className="sp-page">

      {/* Título MY PRODUCTS */}
      <h1 className="sp-titulo">
        MY <span className="sp-verde">PRODUCTS</span>
      </h1>

      {/* Caja CREATE PRODUCT */}
      <div className="sp-caja-crear">
        <div className="sp-crear-texto">
          <h2>CREATE<br />PRODUCT</h2>
        </div>

        <div className="sp-crear-derecha">
          <svg className="sp-icono" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="#666" strokeWidth="2.5" strokeDasharray="7 5" />
            <polyline points="22,34 32,22 42,34" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="32" y1="22" x2="32" y2="44" stroke="#666" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Este botón lleva a CreateSellerProduct */}
          <button className="sp-btn-crear" onClick={() => navigate('/create-seller-product')}>
            Create New Product
          </button>
        </div>
      </div>

      {/* Línea separadora */}
      <div className="sp-linea" />

      {/* Sección RECORD */}
      <div className="sp-caja-record">
        <h2 className="sp-record-titulo">RECORD</h2>

        <div className="sp-lista">
          {productos.map((p) => (
            <div key={p.id} className="sp-tarjeta">

              <div className="sp-tarjeta-izq">
                <p className="sp-fecha">{p.fecha}</p>
                <div className="sp-fila">
                  <img src={p.imagen} alt={p.nombre} className="sp-imagen" />
                  <div className="sp-info">
                    <p className="sp-nombre">{p.nombre}</p>
                    <p className="sp-precio">${p.precio.toFixed(2)} USD</p>
                    <button className="sp-btn-editar">Edit product ↗</button>
                  </div>
                </div>
              </div>

              {/* Verde = sold, Rojo = Unsold */}
              <div className={`sp-estado ${p.estado === 'sold' ? 'sp-sold' : 'sp-unsold'}`}>
                {p.estado === 'sold' ? 'sold' : 'Unsold'}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default SellerProduct;
