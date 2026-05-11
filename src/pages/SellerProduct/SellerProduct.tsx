// El botón "Edit product" lleva a /create-seller-product/:id

import { useNavigate } from 'react-router-dom';
import { useProductos, type Producto } from '../../context/ProductContext';
import './SellerProduct.css';

function SellerProduct() {
  const navigate = useNavigate();
  const { productos } = useProductos();

  return (
    <div className="sp-page">

      <h1 className="sp-titulo">
        MY <span className="sp-verde">PRODUCTS</span>
      </h1>

      <div className="sp-caja-crear">
        <div className="sp-crear-texto">
          <h2>CREATE<br />PRODUCT</h2>
        </div>

        <div className="sp-crear-derecha">
          <img
            src="/assets/images/pages/CreateSellerProduct/Flecha.png"
            alt="Upload image"
            className="sp-icono"
          />

          <button className="sp-btn-crear" onClick={() => navigate('/create-seller-product')}>
            Create New Product +
          </button>
        </div>
      </div>

      <div className="sp-linea" />

      <div className="sp-caja-record">
        <h2 className="sp-record-titulo">RECORD</h2>

        <div className="sp-lista">
          {productos.map((p: Producto) => (
            <div key={p.id} className="sp-tarjeta">

              <div className="sp-tarjeta-izq">
                <p className="sp-fecha">{p.fecha}</p>
                <div className="sp-fila">
                  <img src={p.imagen} alt={p.nombre} className="sp-imagen" />
                  <div className="sp-info">
                    <p className="sp-nombre">{p.nombre}</p>
                    <p className="sp-precio">${p.precio.toFixed(2)} USD</p>

                    {/* Al hacer clic lleva al formulario con los datos del producto */}
                    <button
                      className="sp-btn-editar"
                      onClick={() => navigate(`/create-seller-product/${p.id}`)}
                    >
                      Edit product ↗
                    </button>
                  </div>
                </div>
              </div>

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
