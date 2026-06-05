import type { ReactNode } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import Categories from "../pages/Categories/Categories";
import CreateSellerProduct from "../pages/CreateSellerProduct/CreateSellerProduct";
import EditProfile from "../pages/EditProfile/EditProfile";
import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import Logout from "../pages/Logout/Logout";
import MenCollection from "../pages/MenCollection/MenCollection";
import MyOrders from "../pages/MyOrders/MyOrders";
import NotFound from "../pages/NotFound/NotFound";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import PayPage from "../pages/PayPage/PayPage";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Profile from "../pages/Profile/Profile";
import SearchResults from "../pages/SearchResults/SearchResults";
import SellerProduct from "../pages/SellerProduct/SellerProduct";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import SignUp from "../pages/SignUp/SignUp";
import Wishlist from "../pages/Wishlist/Wishlist";
import WomenCollection from "../pages/WomenCollection/WomenCollection";

function RequireAuth() {
  const { user, isAuthReady } = useAuth();
  const location = useLocation();
  if (!isAuthReady) {
    return null;
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: `${location.pathname}${location.search}`,
          guestNotice: "Sign in to access this page.",
        }}
      />
    );
  }
  return <Outlet />;
}

function GuestOnly({ children }: { children: ReactNode }) {
  const { user, isAuthReady } = useAuth();
  if (!isAuthReady) {
    return null;
  }
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
}

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestOnly>
            <Login />
          </GuestOnly>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestOnly>
            <SignUp />
          </GuestOnly>
        }
      />

      <Route path="/logout" element={<Logout />} />

      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/collections/women" element={<WomenCollection />} />
        <Route path="/collections/men" element={<MenCollection />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categorySlug" element={<Categories />} />

        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-orders/:orderId" element={<OrderDetail />} />
          <Route path="/my-products" element={<SellerProduct />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/seller-product" element={<SellerProduct />} />
          <Route path="/seller-product/new" element={<CreateSellerProduct />} />
          <Route
            path="/create-seller-product"
            element={<CreateSellerProduct />}
          />
          <Route
            path="/create-seller-product/:id"
            element={<CreateSellerProduct />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
