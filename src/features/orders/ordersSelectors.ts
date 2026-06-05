import type { RootState } from "../../store/store";

export const selectOrders = (state: RootState) => state.orders.items;
export const selectActiveOrderId = (state: RootState) => state.orders.activeOrderId;
export const selectOrdersStatus = (state: RootState) => state.orders.status;
export const selectOrdersError = (state: RootState) => state.orders.error;
