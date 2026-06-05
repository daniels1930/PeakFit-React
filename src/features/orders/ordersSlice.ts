import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type OrderRecord = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
};

export type OrdersState = {
  items: OrderRecord[];
  activeOrderId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: OrdersState = {
  items: [],
  activeOrderId: null,
  status: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersLoading(state) {
      state.status = "loading";
      state.error = null;
    },
    setOrders(state, action: PayloadAction<OrderRecord[]>) {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    addOrder(state, action: PayloadAction<OrderRecord>) {
      state.items.unshift(action.payload);
      state.activeOrderId = action.payload.id;
    },
    setActiveOrderId(state, action: PayloadAction<string | null>) {
      state.activeOrderId = action.payload;
    },
    setOrdersError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    clearOrders(state) {
      state.items = [];
      state.activeOrderId = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setOrdersLoading,
  setOrders,
  addOrder,
  setActiveOrderId,
  setOrdersError,
  clearOrders,
} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
