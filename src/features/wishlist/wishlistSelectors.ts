import type { RootState } from "../../store/store";

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistStatus = (state: RootState) => state.wishlist.status;
export const selectWishlistError = (state: RootState) => state.wishlist.error;
export const selectIsProductInWishlist = (productId: string) => (state: RootState) =>
  state.wishlist.items.some((item: { productId: string }) => item.productId === productId);
