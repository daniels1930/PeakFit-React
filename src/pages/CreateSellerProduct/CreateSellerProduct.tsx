// Aquí se crea y se editan los productos
// Si la URL tiene un id como por ejemplo create-seller-product/123, carga los datos del producto
// Si no tiene id como create-seller-product, es un producto nuevo

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductos } from '../../context/ProductContext';
import PageBackButton from '../../components/PageBackButton/PageBackButton';
import './CreateSellerProduct.css';

function CreateSellerProduct() {
  const navigate = useNavigate();

  // useParams lee el id de la URL si existe
  const { id } = useParams<{ id: string }>();

  const { productos, agregarProducto, editarProducto } = useProductos();

  const [titulo, setTitulo] = useState('');
  const [condicion, setCondicion] = useState<'new' | 'used'>('new');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [tag, setTag] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);

  // Si hay un id en la URL, busca el producto y carga sus datos en el formulario
  useEffect(() => {
    if (id) {
      const producto = productos.find((p) => p.id === Number(id));
      if (producto) {
        setTitulo(producto.nombre);
        setPrecio(producto.precio.toString());
        setImagen(producto.imagen);
      }
    }
  }, [id, productos]);

  function manejarImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (archivo) {
      setImagen(URL.createObjectURL(archivo));
    }
  }

  function guardar() {
    if (!titulo.trim()) {
      alert('Enter a title for the product');
      return;
    }
    if (!precio.trim()) {
      alert('Enter a price');
      return;
    }

    if (id) {
      // Si hay id entonces estamos editando un producto existente
      editarProducto(
        Number(id),
        titulo,
        parseFloat(precio) || 0,
        imagen ?? '/assets/images/pages/SellerProduct/producto1.jpg'
      );
    } else {
      // Si no hay id entonces estamos creando un producto nuevo
      agregarProducto(
        titulo,
        parseFloat(precio) || 0,
        imagen ?? '/assets/images/pages/SellerProduct/producto1.jpg'
      );
    }

    // Regresa a SellerProduct con los cambios ya aplicados
    navigate('/seller-product');
  }

  return (
    <div className="csp-page">

      <PageBackButton onClick={() => navigate('/seller-product')} />

      <div className="csp-contenido">

        {/* Zona de imagen */}
        <div className="csp-imagen-zona">
          {imagen ? (
            <img src={imagen} alt="Product preview" className="csp-preview" />
          ) : (
            <label className="csp-upload-label" htmlFor="inputImagen">

              {/* imagen flecha */}
              <img
                src="/assets/images/pages/CreateSellerProduct/Flecha.png"
                alt="Upload image"
                 className="csp-icono"
              />

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
          {/* Título cambia según si es crear o editar */}
          <h1 className="csp-titulo">{id ? 'EDIT PRODUCT' : 'NEW PRODUCT'}</h1>

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
              className={`csp-estado-btn ${condicion === 'new' ? 'csp-activo' : ''}`}
              onClick={() => setCondicion('new')}
            >
              New
            </button>
            <button
              className={`csp-estado-btn ${condicion === 'used' ? 'csp-activo' : ''}`}
              onClick={() => setCondicion('used')}
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
