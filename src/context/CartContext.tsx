import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CatalogProduct } from "../data/productCatalog";
import { parsePriceUsd } from "../utils/price";
import { supabase } from "../lib/supabase";

export type CartLine = {
  id: string;
  name: string;
  image: string;
  priceLabel: string;
  unitPrice: number;
  quantity: number;
};

type CartContextType = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addFromCatalog: (product: CatalogProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Escuchar si hay usuario logueado
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user?.id ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Cargar carrito desde Supabase cuando hay usuario
  useEffect(() => {
    if (!userId) {
      setLines([]);
      return;
    }
    supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .then(({ data }) => {
        if (data) {
          setLines(
            data.map((row) => ({
              id: row.product_id,
              name: row.name,
              image: row.image,
              priceLabel: row.price_label,
              unitPrice: row.unit_price,
              quantity: row.quantity,
            }))
          );
        }
      });
  }, [userId]);

  // Guardar una línea en Supabase
  const upsertLine = useCallback(
    async (line: CartLine) => {
      if (!userId) return;
      await supabase.from("cart_items").upsert({
        user_id: userId,
        product_id: line.id,
        name: line.name,
        image: line.image,
        price_label: line.priceLabel,
        unit_price: line.unitPrice,
        quantity: line.quantity,
      }, { onConflict: "user_id,product_id" });
    },
    [userId]
  );

  // Borrar una línea en Supabase
  const deleteLine = useCallback(
    async (productId: string) => {
      if (!userId) return;
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);
    },
    [userId]
  );

  const addFromCatalog = useCallback(
    (product: CatalogProduct, quantity = 1) => {
      const unitPrice = parsePriceUsd(product.price);
      const qty = Math.max(1, Math.floor(quantity));
      setLines((prev) => {
        const existing = prev.find((line) => line.id === product.id);
        let next: CartLine[];
        if (existing) {
          next = prev.map((line) =>
            line.id === product.id
              ? { ...line, quantity: line.quantity + qty }
              : line
          );
        } else {
          const newLine: CartLine = {
            id: product.id,
            name: product.name,
            image: product.images[0],
            priceLabel: product.price,
            unitPrice,
            quantity: qty,
          };
          next = [...prev, newLine];
        }
        const updated = next.find((l) => l.id === product.id)!;
        upsertLine(updated);
        return next;
      });
    },
    [upsertLine]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      const q = Math.max(0, Math.floor(quantity));
      setLines((prev) => {
        if (q === 0) {
          deleteLine(productId);
          return prev.filter((line) => line.id !== productId);
        }
        const next = prev.map((line) =>
          line.id === productId ? { ...line, quantity: q } : line
        );
        const updated = next.find((l) => l.id === productId);
        if (updated) upsertLine(updated);
        return next;
      });
    },
    [upsertLine, deleteLine]
  );

  const increment = useCallback(
    (productId: string) => {
      setLines((prev) => {
        const next = prev.map((line) =>
          line.id === productId ? { ...line, quantity: line.quantity + 1 } : line
        );
        const updated = next.find((l) => l.id === productId);
        if (updated) upsertLine(updated);
        return next;
      });
    },
    [upsertLine]
  );

  const decrement = useCallback(
    (productId: string) => {
      setLines((prev) => {
        const next = prev
          .map((line) =>
            line.id === productId ? { ...line, quantity: line.quantity - 1 } : line
          )
          .filter((line) => line.quantity > 0);
        const updated = next.find((l) => l.id === productId);
        if (updated) upsertLine(updated);
        else deleteLine(productId);
        return next;
      });
    },
    [upsertLine, deleteLine]
  );

  const removeLine = useCallback(
    (productId: string) => {
      deleteLine(productId);
      setLines((prev) => prev.filter((line) => line.id !== productId));
    },
    [deleteLine]
  );

  const clearCart = useCallback(() => {
    if (userId) {
      supabase.from("cart_items").delete().eq("user_id", userId);
    }
    setLines([]);
  }, [userId]);

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      addFromCatalog,
      updateQuantity,
      increment,
      decrement,
      removeLine,
      clearCart,
    }),
    [lines, itemCount, subtotal, addFromCatalog, updateQuantity, increment, decrement, removeLine, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider is missing in main.tsx");
  return ctx;
}