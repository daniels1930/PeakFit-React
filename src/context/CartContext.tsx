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
import { useAppDispatch } from "../store/hooks";
import {
  addCartItem,
  clearCart as clearCartState,
  removeCartItem,
  setCartItems,
  updateCartItemQuantity,
} from "../features/cart/cartSlice";

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

async function loadCartLines(userId: string): Promise<CartLine[]> {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
        product_id,
        quantity,
        unit_price,
        products (
          id,
          title,
          price,
          product_images (
            image_url,
            sort_order
          )
        )
      `
    )
    .eq("user_id", userId);

  if (error || !data) return [];

  return (data as Array<{
    product_id: string;
    quantity: number;
    unit_price: number;
    products?: {
      id?: string;
      title?: string;
      price?: number | string;
      product_images?: Array<{ image_url: string; sort_order: number }>;
    } | null;
  }>).flatMap((row) => {
    const product = Array.isArray(row.products) ? row.products[0] : row.products;
    if (!product) return [];
    const images = Array.isArray(product.product_images) ? product.product_images : [];
    const firstImage =
      images
        .sort((a: { image_url: string; sort_order: number }, b: { image_url: string; sort_order: number }) => a.sort_order - b.sort_order)[0]
        ?.image_url ?? "";
    const unitPrice = Number(row.unit_price ?? product.price ?? 0);
    return [
      {
        id: product.id ?? row.product_id,
        name: product.title ?? "",
        image: firstImage,
        priceLabel: `$${unitPrice.toFixed(2)}`,
        unitPrice,
        quantity: row.quantity ?? 1,
      },
    ];
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: { data: { session: { user?: { id?: string } } | null } }) => {
      setUserId(data.session?.user?.id ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: { user?: { id?: string } } | null) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) {
      setLines([]);
      dispatch(clearCartState());
      return;
    }
    loadCartLines(userId).then((items) => {
      setLines(items);
      dispatch(
        setCartItems(
          items.map((item) => ({
            productId: item.id,
            name: item.name,
            image: item.image,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
          }))
        )
      );
    });
  }, [userId]);

  const upsertLine = useCallback(
    async (line: CartLine) => {
      if (!userId) return;
      const payload = {
        user_id: userId,
        product_id: line.id,
        quantity: line.quantity,
        unit_price: line.unitPrice,
      };

      const { data: existing, error: fetchError } = await supabase
        .from("cart_items")
        .select("id")
        .eq("user_id", userId)
        .eq("product_id", line.id)
        .maybeSingle();

      if (fetchError) {
        console.error("Error checking cart item:", fetchError);
        return;
      }

      if (existing?.id) {
        const { error: updateError } = await supabase
          .from("cart_items")
          .update(payload)
          .eq("id", existing.id);

        if (updateError) {
          console.error("Error updating cart item:", updateError);
        }
        return;
      }

      const { error: insertError } = await supabase.from("cart_items").insert(payload);
      if (insertError) {
        console.error("Error inserting cart item:", insertError);
      }
    },
    [userId]
  );

  const deleteLine = useCallback(
    async (productId: string) => {
      if (!userId) return;
      await supabase.from("cart_items").delete().eq("user_id", userId).eq("product_id", productId);
    },
    [userId]
  );

  const addFromCatalog = useCallback(
    (product: CatalogProduct, quantity = 1) => {
      const unitPrice = parsePriceUsd(product.price);
      const qty = Math.max(1, Math.floor(quantity));
      setLines((prev) => {
        const existing = prev.find((line) => line.id === product.id);
        const next = existing
          ? prev.map((line) =>
              line.id === product.id
                ? { ...line, quantity: line.quantity + qty, priceLabel: product.price }
                : line
            )
          : [
              ...prev,
              {
                id: product.id,
                name: product.name,
                image: product.images[0],
                priceLabel: product.price,
                unitPrice,
                quantity: qty,
              },
            ];
        const updated = next.find((l) => l.id === product.id);
        if (updated) void upsertLine(updated);
        dispatch(
          addCartItem({
            productId: product.id,
            name: product.name,
            image: product.images[0],
            unitPrice,
            quantity: qty,
          })
        );
        return next;
      });
    },
    [upsertLine, dispatch]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      const q = Math.max(0, Math.floor(quantity));
      setLines((prev) => {
        if (q === 0) {
          void deleteLine(productId);
          dispatch(removeCartItem(productId));
          return prev.filter((line) => line.id !== productId);
        }
        const next = prev.map((line) => (line.id === productId ? { ...line, quantity: q } : line));
        const updated = next.find((l) => l.id === productId);
        if (updated) void upsertLine(updated);
        dispatch(updateCartItemQuantity({ productId, quantity: q }));
        return next;
      });
    },
    [upsertLine, deleteLine, dispatch]
  );

  const increment = useCallback(
    (productId: string) => {
      setLines((prev) => {
        const next = prev.map((line) =>
          line.id === productId ? { ...line, quantity: line.quantity + 1 } : line
        );
        const updated = next.find((l) => l.id === productId);
        if (updated) void upsertLine(updated);
        if (updated) {
          dispatch(updateCartItemQuantity({ productId, quantity: updated.quantity }));
        }
        return next;
      });
    },
    [upsertLine, dispatch]
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
        if (updated) void upsertLine(updated);
        else void deleteLine(productId);
        if (updated) {
          dispatch(updateCartItemQuantity({ productId, quantity: updated.quantity }));
        } else {
          dispatch(removeCartItem(productId));
        }
        return next;
      });
    },
    [upsertLine, deleteLine, dispatch]
  );

  const removeLine = useCallback(
    (productId: string) => {
      void deleteLine(productId);
      setLines((prev) => prev.filter((line) => line.id !== productId));
      dispatch(removeCartItem(productId));
    },
    [deleteLine, dispatch]
  );

  const clearCart = useCallback(() => {
    if (userId) {
      void supabase.from("cart_items").delete().eq("user_id", userId);
    }
    setLines([]);
    dispatch(clearCartState());
  }, [userId, dispatch]);

  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0), [lines]);

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
