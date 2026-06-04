import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { productsReducer } from "../features/products/productsSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { wishlistReducer } from "../features/wishlist/wishlistSlice";
import { ordersReducer } from "../features/orders/ordersSlice";
import {
  createReduxPersistenceMiddleware,
  hydrateReduxPersistence,
} from "../services/reduxPersistence";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
const preloadedState: Partial<RootState> = {
  cart: hydrateReduxPersistence().cart as RootState["cart"],
  wishlist: hydrateReduxPersistence().wishlist as RootState["wishlist"],
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createReduxPersistenceMiddleware()),
});

export type AppDispatch = typeof store.dispatch;
