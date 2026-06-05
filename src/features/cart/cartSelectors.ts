import type { RootState } from "../../store/store";

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectCartError = (state: RootState) => state.cart.error;
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((sum: number, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((sum: number, item) => sum + item.unitPrice * item.quantity, 0);
