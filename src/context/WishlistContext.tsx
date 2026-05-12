import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

  const toggleWishlist = useCallback((producto: WishlistProduct) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === producto.id);
      if (exists) {
        return prev.filter((p) => p.id !== producto.id);
      }
      return [...prev, producto];
    });
  }, []);

  const isInWishlist = useCallback(
    (id: string) => items.some((p) => p.id === id),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      toggleWishlist,
      isInWishlist,
    }),
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
