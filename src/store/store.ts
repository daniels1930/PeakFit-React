import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { productsReducer } from "../features/products/productsSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { wishlistReducer } from "../features/wishlist/wishlistSlice";
import { ordersReducer } from "../features/orders/ordersSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
