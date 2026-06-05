// useNavigate permite cambiar de página sin recargar
import { useNavigate } from 'react-router-dom';
// useProductos trae la lista de productos del contexto global
// Producto es el tipo que define cómo luce cada producto
import { useProductos, type Producto } from '../../context/ProductContext';
import './SellerProduct.css';

function SellerProduct() {
  const navigate = useNavigate();

  // productos es la lista de todos los productos guardados en el contexto
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

          {/* Al hacer clic va a /create-seller-product SIN id, entonces es producto nuevo */}
          <button className="sp-btn-crear" onClick={() => navigate('/create-seller-product')}>
            Create New Product +
          </button>
        </div>
      </div>

      <div className="sp-linea" />

      <div className="sp-caja-record">
        <h2 className="sp-record-titulo">RECORD</h2>

        <div className="sp-lista">
          {/* .map recorre el array de productos y por cada uno crea una tarjeta */}
          {productos.map((p: Producto) => (

            // key le dice a React qué tarjeta es cada una para actualizarlas bien
            <div key={p.id} className="sp-tarjeta">

              <div className="sp-tarjeta-izq">
                <p className="sp-fecha">{p.fecha}</p>
                <div className="sp-fila">
                  <img src={p.imagen} alt={p.nombre} className="sp-imagen" />
                  <div className="sp-info">
                    <p className="sp-nombre">{p.nombre}</p>

                    {/* toFixed(2) muestra el precio siempre con 2 decimales, ej: 10.00 */}
                    <p className="sp-precio">${p.precio.toFixed(2)} USD</p>

                    {/* Al hacer clic va a /create-seller-product/123 CON id, entonces es edición */}
                    <button
                      className="sp-btn-editar"
                      onClick={() => navigate(`/create-seller-product/${p.id}`)}
                    >
                      Edit product ↗
                    </button>
                  </div>
                </div>
              </div>

              {/* Cambia el estilo y texto según si el producto está vendido o no */}
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

// .map() — recorre la lista de productos y por cada uno devuelve una tarjeta visual. Sin map tendrías que escribir cada tarjeta a mano.
// navigate con y sin id — cuando el botón "Create" navega a /create-seller-product sin id es producto nuevo. Cuando "Edit" navega a /create-seller-product/123 con id es edición. El otro componente lee ese id con useParams.
// Ternario de estado — p.estado === 'sold' ? 'sold' : 'Unsold' cambia el texto y la clase CSS según el estado del producto, todo en una sola línea.