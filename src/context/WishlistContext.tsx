import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

export type WishlistProduct = {
  id: string;
  name: string;
  image: string;
  price: string;
};

type WishlistContextType = {
  items: WishlistProduct[];
  toggleWishlist: (producto: WishlistProduct) => void;
  isInWishlist: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistProduct[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user?.id ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) {
      setItems([]);
      return;
    }
    supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", userId)
      .then(({ data }) => {
        if (data) {
          setItems(
            data.map((row) => ({
              id: row.product_id,
              name: row.name,
              image: row.image,
              price: row.price,
            }))
          );
        }
      });
  }, [userId]);

  const toggleWishlist = useCallback(
    (producto: WishlistProduct) => {
      setItems((prev) => {
        const exists = prev.some((p) => p.id === producto.id);
        if (exists) {
          if (userId) {
            supabase
              .from("wishlist_items")
              .delete()
              .eq("user_id", userId)
              .eq("product_id", producto.id);
          }
          return prev.filter((p) => p.id !== producto.id);
        }
        if (userId) {
          supabase.from("wishlist_items").insert({
            user_id: userId,
            product_id: producto.id,
            name: producto.name,
            image: producto.image,
            price: producto.price,
          });
        }
        return [...prev, producto];
      });
    },
    [userId]
  );

  const isInWishlist = useCallback(
    (id: string) => items.some((p) => p.id === id),
    [items]
  );

  const value = useMemo(
    () => ({ items, toggleWishlist, isInWishlist }),
    [items, toggleWishlist, isInWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("WishlistProvider is missing in main.tsx");
  return ctx;
}

export function catalogProductToWishlist(p: {
  id: string;
  name: string;
  images: string[];
  price: string;
}): WishlistProduct {
  return {
    id: p.id,
    name: p.name,
    image: p.images[0],
    price: p.price,
  };
}