// Guarda los productos y tiene funciones para agregar y editar

import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Producto {
  id: number;
  fecha: string;
  nombre: string;
  precio: number;
  estado: 'sold' | 'unsold';
  imagen: string;
}

interface ProductContextType {
  productos: Producto[];
  agregarProducto: (nombre: string, precio: number, imagen: string) => void;
  editarProducto: (id: number, nombre: string, precio: number, imagen: string) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function useProductos() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('ProductProvider is missing in main.tsx');
  return ctx;
}

const productosIniciales: Producto[] = [
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

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);

  // Agrega un producto nuevo al inicio de la lista
  function agregarProducto(nombre: string, precio: number, imagen: string) {
    const nuevo: Producto = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      }),
      nombre,
      precio,
      imagen,
      estado: 'unsold',
    };
    setProductos((prev) => [nuevo, ...prev]);
  }

  // Edita un producto que ya existe buscándolo por id
  function editarProducto(id: number, nombre: string, precio: number, imagen: string) {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, nombre, precio, imagen } : p
      )
    );
  }

  return (
    <ProductContext.Provider value={{ productos, agregarProducto, editarProducto }}>
      {children}
    </ProductContext.Provider>
  );
}
