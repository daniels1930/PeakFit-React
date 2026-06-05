import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export interface Producto {
  id: string;
  fecha: string;
  nombre: string;
  precio: number;
  estado: 'sold' | 'unsold';
  imagen: string;
  categoryId: string | null;
  categoryName: string;
}

const fallbackCategoryNames: Record<string, string> = {
  women: 'Women',
  men: 'Men',
  accessories: 'Accessories',
  equipment: 'Equipment',
};

interface ProductContextType {
  productos: Producto[];
  agregarProducto: (nombre: string, precio: number, imagen: string, categoryId: string) => Promise<void>;
  editarProducto: (
    id: string,
    nombre: string,
    precio: number,
    imagen: string,
    categoryId: string
  ) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function useProductos() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('ProductProvider is missing in main.tsx');
  return ctx;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user?.id ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadSellerProducts = async (uid: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images (image_url), categories (id, name, slug)')
      .eq('seller_id', uid)
      .order('created_at', { ascending: false });

    if (error || !data) {
      setProductos([]);
      return;
    }

    const mapped: Producto[] = data.map((p: any) => {
      const images = Array.isArray(p.product_images) ? p.product_images : [];
      const imageUrl = images[0]?.image_url ?? '/assets/images/pages/SellerProduct/producto1.jpg';
      return {
        id: p.id,
        fecha: new Date(p.created_at).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        }),
        nombre: p.title,
        precio: Number(p.price),
        estado: p.status === 'sold' ? 'sold' : 'unsold',
        imagen: imageUrl,
        categoryId: Array.isArray(p.categories)
          ? p.categories[0]?.id ?? null
          : p.categories?.id ?? p.category_id ?? null,
        categoryName: Array.isArray(p.categories)
          ? p.categories[0]?.name ?? fallbackCategoryNames[p.category_id as string] ?? 'Uncategorized'
          : p.categories?.name ?? fallbackCategoryNames[p.category_id as string] ?? 'Uncategorized',
      };
    });

    setProductos(mapped);
  };

  useEffect(() => {
    if (!userId) {
      setProductos([]);
      return;
    }
    loadSellerProducts(userId);
  }, [userId]);

  // Agrega un producto nuevo en Supabase
  async function agregarProducto(nombre: string, precio: number, imagen: string, categoryId: string) {
    if (!userId) return;

    const { data: newProd, error: prodErr } = await supabase
      .from('products')
      .insert({
        seller_id: userId,
        category_id: categoryId,
        title: nombre,
        description: 'Seller uploaded product',
        price: precio,
        status: 'draft',
        product_condition: 'new',
      })
      .select()
      .single();

    if (prodErr || !newProd) {
      console.error('Error inserting product:', prodErr);
      return;
    }

    const { error: imgErr } = await supabase
      .from('product_images')
      .insert({
        product_id: newProd.id,
        image_url: imagen,
        sort_order: 0,
      });

    if (imgErr) {
      console.error('Error inserting product image:', imgErr);
      return;
    }

    await loadSellerProducts(userId);
  }

  // Edita un producto que ya existe en Supabase
  async function editarProducto(id: string, nombre: string, precio: number, imagen: string, categoryId: string) {
    if (!userId) return;

    const { error: prodErr } = await supabase
      .from('products')
      .update({
        title: nombre,
        price: precio,
        category_id: categoryId,
      })
      .eq('id', id)
      .eq('seller_id', userId);

    if (prodErr) {
      console.error('Error updating product:', prodErr);
      return;
    }

    // Reemplaza la imagen del producto
    await supabase.from('product_images').delete().eq('product_id', id);
    const { error: imgErr } = await supabase
      .from('product_images')
      .insert({
        product_id: id,
        image_url: imagen,
        sort_order: 0,
      });

    if (imgErr) {
      console.error('Error updating product image:', imgErr);
    }

    await loadSellerProducts(userId);
  }

  return (
    <ProductContext.Provider value={{ productos, agregarProducto, editarProducto }}>
      {children}
    </ProductContext.Provider>
  );
}
