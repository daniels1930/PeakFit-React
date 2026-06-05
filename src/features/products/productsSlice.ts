import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ProductItem = {
  id: string;
  title: string;
  price: string;
  category?: string;
  image?: string;
};

export type ProductsState = {
  items: ProductItem[];
  selectedProductId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  selectedProductId: null,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsLoading(state) {
      state.status = "loading";
      state.error = null;
    },
    setProducts(state, action: PayloadAction<ProductItem[]>) {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    setSelectedProductId(state, action: PayloadAction<string | null>) {
      state.selectedProductId = action.payload;
    },
    setProductsError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    clearProducts(state) {
      state.items = [];
      state.selectedProductId = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setProductsLoading,
  setProducts,
  setSelectedProductId,
  setProductsError,
  clearProducts,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
