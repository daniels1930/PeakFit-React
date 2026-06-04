import type { RootState } from "../../store/store";

export const selectProducts = (state: RootState) => state.products.items;
export const selectSelectedProductId = (state: RootState) => state.products.selectedProductId;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
