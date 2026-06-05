import type { Middleware } from "@reduxjs/toolkit";
import type { CartState } from "../features/cart/cartSlice";
import type { WishlistState } from "../features/wishlist/wishlistSlice";

const CART_STORAGE_KEY = "peakfit_cart";
const WISHLIST_STORAGE_KEY = "peakfit_wishlist";

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function loadStorage<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function hydrateReduxPersistence(): {
  cart: Pick<CartState, "items">;
  wishlist: Pick<WishlistState, "items">;
} {
  return {
    cart: { items: loadStorage<CartState["items"]>(CART_STORAGE_KEY, []) },
    wishlist: { items: loadStorage<WishlistState["items"]>(WISHLIST_STORAGE_KEY, []) },
  };
}

export const createReduxPersistenceMiddleware = (): Middleware => (storeApi) => (next) => (action) => {
  const result = next(action);
  const state = storeApi.getState() as {
    cart: CartState;
    wishlist: WishlistState;
  };

  saveStorage(CART_STORAGE_KEY, state.cart.items);
  saveStorage(WISHLIST_STORAGE_KEY, state.wishlist.items);

  return result;
};
