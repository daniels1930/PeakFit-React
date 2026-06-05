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
import { useAppDispatch } from "../store/hooks";
import {
  addWishlistItem,
  clearWishlist as clearWishlistState,
  removeWishlistItem,
  setWishlistItems,
} from "../features/wishlist/wishlistSlice";

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

async function loadWishlistItems(userId: string): Promise<WishlistProduct[]> {
  const { data, error } = await supabase
    .from("wishlist_items")
    .select(
      `
        product_id,
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

    return [
      {
        id: product.id ?? row.product_id,
        name: product.title ?? "",
        image: firstImage,
        price:
          typeof product.price === "number"
            ? `$${Number(product.price).toFixed(2)}`
            : String(product.price ?? ""),
      },
    ];
  });
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistProduct[]>([]);
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
      setItems([]);
      dispatch(clearWishlistState());
      return;
    }

    loadWishlistItems(userId).then((loaded) => {
      setItems(loaded);
      dispatch(
        setWishlistItems(
          loaded.map((item) => ({
            productId: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
          }))
        )
      );
    });
  }, [userId]);

  const toggleWishlist = useCallback(
    async (producto: WishlistProduct) => {
      const exists = items.some((p) => p.id === producto.id);

      if (exists) {
        if (userId) {
          const { error } = await supabase
            .from("wishlist_items")
            .delete()
            .eq("user_id", userId)
            .eq("product_id", producto.id);

          if (error) {
            console.error("Error removing wishlist item:", error);
            return;
          }
        }

        setItems((prev) => prev.filter((p) => p.id !== producto.id));
        dispatch(removeWishlistItem(producto.id));
        return;
      }

      if (userId) {
        const { error } = await supabase.from("wishlist_items").insert({
          user_id: userId,
          product_id: producto.id,
        });

        if (error) {
          console.error("Error inserting wishlist item:", error);
          return;
        }
      }

      setItems((prev) => [...prev, producto]);
      dispatch(
        addWishlistItem({
          productId: producto.id,
          name: producto.name,
          image: producto.image,
          price: producto.price,
        })
      );
    },
    [items, userId, dispatch]
  );

  const isInWishlist = useCallback((id: string) => items.some((p) => p.id === id), [items]);

  const value = useMemo(
    () => ({ items, toggleWishlist, isInWishlist }),
    [items, toggleWishlist, isInWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
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
