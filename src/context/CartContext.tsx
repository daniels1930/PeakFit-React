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

const CART_STORAGE_KEY = "peakfit_cart";

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        line &&
        typeof line.id === "string" &&
        typeof line.quantity === "number" &&
        line.quantity > 0 &&
        typeof line.unitPrice === "number"
    );
  } catch {
    return [];
  }
}

function persistCart(lines: CartLine[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => loadCart());

  useEffect(() => {
    persistCart(lines);
  }, [lines]);

  const addFromCatalog = useCallback((product: CatalogProduct, quantity = 1) => {
    const unitPrice = parsePriceUsd(product.price);
    const qty = Math.max(1, Math.floor(quantity));

    setLines((prev) => {
      const existing = prev.find((line) => line.id === product.id);
      if (existing) {
        return prev.map((line) =>
          line.id === product.id
            ? { ...line, quantity: line.quantity + qty, priceLabel: product.price }
            : line
        );
      }
      const next: CartLine = {
        id: product.id,
        name: product.name,
        image: product.images[0],
        priceLabel: product.price,
        unitPrice,
        quantity: qty,
      };
      return [...prev, next];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const q = Math.max(0, Math.floor(quantity));
    setLines((prev) => {
      if (q === 0) {
        return prev.filter((line) => line.id !== productId);
      }
      return prev.map((line) => (line.id === productId ? { ...line, quantity: q } : line));
    });
  }, []);

  const increment = useCallback((productId: string) => {
    setLines((prev) =>
      prev.map((line) =>
        line.id === productId ? { ...line, quantity: line.quantity + 1 } : line
      )
    );
  }, []);

  const decrement = useCallback((productId: string) => {
    setLines((prev) =>
      prev
        .map((line) =>
          line.id === productId ? { ...line, quantity: line.quantity - 1 } : line
        )
        .filter((line) => line.quantity > 0)
    );
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((line) => line.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

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
    [
      lines,
      itemCount,
      subtotal,
      addFromCatalog,
      updateQuantity,
      increment,
      decrement,
      removeLine,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider is missing in main.tsx");
  return ctx;
}
