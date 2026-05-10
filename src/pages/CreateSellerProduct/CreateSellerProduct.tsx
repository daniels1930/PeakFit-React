import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateSellerProduct.css';

function CreateSellerProduct() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('new');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [tag, setTag] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);

  // Cuando el usuario elige una imagen la muestra
  function manejarImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (archivo) {
      setImagen(URL.createObjectURL(archivo));
    }
  }

  function guardar() {
    alert('Producto guardado: ' + titulo);
  }

  return (
    <div className="csp-page">

      {/* Botón Back que regresa a SellerProduct */}
      <button className="csp-back" onClick={() => navigate('/seller-product')}>
        ← Back
      </button>

      {/* Contenido: imagen izquierda y formulario derecho */}
      <div className="csp-contenido">

        {/* Zona de imagen */}
        <div className="csp-imagen-zona">
          {imagen ? (
            <img src={imagen} alt="producto" className="csp-preview" />
          ) : (
            <label className="csp-upload-label" htmlFor="inputImagen">
              <svg className="csp-icono" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="28" stroke="#666" strokeWidth="2.5" strokeDasharray="7 5" />
                <polyline points="22,34 32,22 42,34" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="32" y1="22" x2="32" y2="44" stroke="#666" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span>Upload Image</span>
              <input
                id="inputImagen"
                type="file"
                accept="image/*"
                onChange={manejarImagen}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>

        {/* Formulario */}
        <div className="csp-form">
          <h1 className="csp-titulo">NEW PRODUCT</h1>

          <label className="csp-label">Title</label>
          <input
            className="csp-input"
            type="text"
            placeholder="tile123"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <label className="csp-label">State</label>
          <div className="csp-estado-botones">
            <button
              className={`csp-estado-btn ${estado === 'new' ? 'csp-activo' : ''}`}
              onClick={() => setEstado('new')}
            >
              New
            </button>
            <button
              className={`csp-estado-btn ${estado === 'used' ? 'csp-activo' : ''}`}
              onClick={() => setEstado('used')}
            >
              Used
            </button>
          </div>

          <label className="csp-label">Description</label>
          <textarea
            className="csp-textarea"
            placeholder="Add a description..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <label className="csp-label">Add price</label>
          <input
            className="csp-input csp-input-precio"
            type="text"
            placeholder="00.00$"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />

          <label className="csp-label">Add a tag</label>
          <input
            className="csp-input"
            type="text"
            placeholder="fit"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          <button className="csp-btn-guardar" onClick={guardar}>
            Save changes
          </button>
        </div>
      </div>

    </div>
  );
}

export default CreateSellerProduct;
