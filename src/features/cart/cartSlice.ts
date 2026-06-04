import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    addCartItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((item) => item.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity;
        existing.unitPrice = action.payload.unitPrice;
        existing.name = action.payload.name;
        existing.image = action.payload.image;
        return;
      }
      state.items.push(action.payload);
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const item = state.items.find((line) => line.productId === action.payload.productId);
      if (!item) return;
      item.quantity = action.payload.quantity;
      state.items = state.items.filter((line) => line.quantity > 0);
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
    setCartError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  setCartItems,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  setCartError,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
