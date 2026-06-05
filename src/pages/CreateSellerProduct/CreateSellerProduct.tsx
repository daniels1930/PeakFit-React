// useNavigate: para cambiar de página
// useParams: para leer el id de la URL
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductos } from '../../context/ProductContext';
import PageBackButton from '../../components/PageBackButton/PageBackButton';
import { supabase } from '../../lib/supabase';
import './CreateSellerProduct.css';

type CategoryOption = {
  id: string;
  name: string;
  slug: string;
};

const fallbackCategories: CategoryOption[] = [
  { id: "women", name: "Women", slug: "women" },
  { id: "men", name: "Men", slug: "men" },
  { id: "accessories", name: "Accessories", slug: "accessories" },
  { id: "equipment", name: "Equipment", slug: "equipment" },
];

function CreateSellerProduct() {
  const navigate = useNavigate();

  // Lee el id de la URL. Ej: si la URL es /create-seller-product/123, id = "123"
  // Si la URL es /create-seller-product, id = undefined
  const { id } = useParams<{ id: string }>();

  // Trae las funciones y datos del contexto global de productos
  const { productos, agregarProducto, editarProducto } = useProductos();

  // Cada useState guarda un dato del formulario mientras el usuario escribe
  const [titulo, setTitulo] = useState('');
  const [condicion, setCondicion] = useState<'new' | 'used'>('new');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [tag, setTag] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);
  const [categorySlug, setCategorySlug] = useState('');
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  // useEffect se ejecuta cuando el componente carga o cuando cambia el id
  // Si hay un id, busca ese producto y rellena el formulario con sus datos (modo edición)
  // Si no hay id, el formulario queda vacío (modo creación)
  useEffect(() => {
    if (id) {
      const producto = productos.find((p) => p.id === id);
      if (producto) {
        setTitulo(producto.nombre);
        setPrecio(producto.precio.toString());
        setImagen(producto.imagen);
        setCategorySlug(producto.categoryName.toLowerCase());
      }
    }
  }, [id, productos]);

  useEffect(() => {
    supabase
      .from('categories')
      .select('id, name, slug')
      .order('name', { ascending: true })
      .then(({ data, error }) => {
        const dbCategories = (error || !data ? [] : (data as CategoryOption[]));
        const merged = dbCategories.length > 0 ? dbCategories : fallbackCategories;
        setCategories(merged);
      });
  }, []);

  // Cuando el usuario sube una imagen, crea una URL temporal para previsualizarla
  function manejarImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = () => setImagen(reader.result as string);
    reader.readAsDataURL(archivo);
  }

  async function guardar() {
    // Validaciones básicas antes de guardar
    if (!titulo.trim()) {
      alert('Enter a title for the product');
      return;
    }
    if (!precio.trim()) {
      alert('Enter a price');
      return;
    }
    if (!categorySlug.trim()) {
      alert('Select a category');
      return;
    }

    const selectedCategory = categories.find((category) => category.slug === categorySlug);
    if (!selectedCategory || selectedCategory.id === selectedCategory.slug) {
      alert('The category table needs real database rows before saving. Please seed categories in Supabase.');
      return;
    }

    // Si hay id → editar producto existente
    // Si no hay id → crear producto nuevo
    if (id) {
      await editarProducto(
        id,
        titulo,
        parseFloat(precio) || 0,
        imagen ?? '/assets/images/pages/SellerProduct/producto1.jpg',
        selectedCategory.id
      );
    } else {
      await agregarProducto(
        titulo,
        parseFloat(precio) || 0,
        imagen ?? '/assets/images/pages/SellerProduct/producto1.jpg',
        selectedCategory.id
      );
    }

    // Después de guardar, regresa a la página de productos
    navigate('/seller-product');
  }

  return (
    <div className="csp-page">
      <PageBackButton onClick={() => navigate('/seller-product')} />

      <div className="csp-contenido">

        {/* Si ya hay imagen la muestra, si no muestra el botón para subir una */}
        <div className="csp-imagen-zona">
          {imagen ? (
            <img src={imagen} alt="Product preview" className="csp-preview" />
          ) : (
            <label className="csp-upload-label" htmlFor="inputImagen">
              <img
                src="/assets/images/pages/CreateSellerProduct/Flecha.png"
                alt="Upload image"
                className="csp-icono"
              />
              <span>Upload Image</span>
              {/* input oculto, se activa al hacer clic en el label */}
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

        <div className="csp-form">
          {/* El título cambia según si estamos editando o creando */}
          <h1 className="csp-titulo">{id ? 'EDIT PRODUCT' : 'NEW PRODUCT'}</h1>

          <label className="csp-label">Title</label>
          {/* Cada input está conectado a su useState: value lo muestra, onChange lo actualiza */}
          <input
            className="csp-input"
            type="text"
            placeholder="tile123"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <label className="csp-label">State</label>
          {/* Botones que cambian el estado condicion entre 'new' y 'used' */}
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

          <label className="csp-label">Category</label>
          <select
            className="csp-input"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <button className="csp-btn-guardar" onClick={guardar}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSellerProduct;


// useParams — lee variables de la URL. Si la URL tiene /123, te da id = "123".
// useState — cada campo del formulario tiene su propio estado. Cuando el usuario escribe, onChange actualiza el estado y React re-renderiza.
// useEffect — detecta si hay un id en la URL. Si hay, rellena el formulario con los datos existentes (edición). Si no hay, el formulario queda vacío (creación).
// id ? editar : crear — un ternario que decide si llamar editarProducto o agregarProducto según si venimos de editar o crear.
