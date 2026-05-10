// CreateSellerProduct 
// Se llega desde SellerProduct al hacer clic en "Create New Product +"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateSellerProduct.css';

function CreateSellerProduct() {
  const navigate = useNavigate();

  // Guarda los valores del formulario
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('new');       // new o used
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [tag, setTag] = useState('');
  const [imagen, setImagen] = useState<string | null>(null); // preview de la imagen

  // Cuando el usuario elige una imagen, la muestra en la caja izquierda
  function manejarImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (archivo) {
      const url = URL.createObjectURL(archivo);
      setImagen(url); // guarda la url y la muestra
    }
  }

  function guardar() {
    alert('Producto guardado: ' + titulo);
    // Despues se conecta con la base de datos
  }

  return (
    <div className="csp-page">

      {/* Botón Back */}
      <button className="csp-back" onClick={() => navigate('/seller-product')}>
        ← Back
      </button>

      {/*  imagen y formulario */}
      <div className="csp-contenido">

        {/* Zona para subir imagen */}
        <div className="csp-imagen-zona">
          {imagen ? (
            // muestra la imagen
            <img src={imagen} alt="producto" className="csp-preview" />
          ) : (
            // Si no hay imagen muestra el ícono y el texto "Upload Image"
            <label className="csp-upload-label" htmlFor="inputImagen">
              <svg className="csp-icono" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="28" stroke="#666" strokeWidth="2.5" strokeDasharray="7 5" />
                <polyline points="22,34 32,22 42,34" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="32" y1="22" x2="32" y2="44" stroke="#666" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span>Upload Image</span>
              {/* Input oculto que abre el selector de archivos */}
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

          {/* Titulo */}
          <label className="csp-label">Title</label>
          <input
            className="csp-input"
            type="text"
            placeholder="tile123"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          {/* New y Used */}
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

          {/* Description */}
          <label className="csp-label">Description</label>
          <textarea
            className="csp-textarea"
            placeholder="Add a description..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          {/* Add price */}
          <label className="csp-label">Add price</label>
          <input
            className="csp-input csp-input-precio"
            type="text"
            placeholder="00.00$"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />

          {/*  Add a tag */}
          <label className="csp-label">Add a tag</label>
          <input
            className="csp-input"
            type="text"
            placeholder="fit"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          {/* Botón guardar */}
          <button className="csp-btn-guardar" onClick={guardar}>
            Save changes
          </button>
        </div>
      </div>

    </div>
  );
}

export default CreateSellerProduct;
