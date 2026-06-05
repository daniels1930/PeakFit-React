import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type WishlistItem = {
  productId: string;
  name: string;
  image: string;
  price: string;
};

export type WishlistState = {
  items: WishlistItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: WishlistState = {
  items: [],
  status: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistItems(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    addWishlistItem(state, action: PayloadAction<WishlistItem>) {
      if (state.items.some((item) => item.productId === action.payload.productId)) return;
      state.items.push(action.payload);
    },
    removeWishlistItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
    setWishlistError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  setWishlistItems,
  addWishlistItem,
  removeWishlistItem,
  clearWishlist,
  setWishlistError,
} = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
