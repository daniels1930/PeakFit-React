import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Categories from "../pages/Categories/Categories";
import CreateSellerProduct from "../pages/CreateSellerProduct/CreateSellerProduct";
import EditProfile from "../pages/EditProfile/EditProfile";
import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import MenCollection from "../pages/MenCollection/MenCollection";
import MyOrders from "../pages/MyOrders/MyOrders";
import MyProducts from "../pages/MyProducts/MyProducts";
import NotFound from "../pages/NotFound/NotFound";
import PayPage from "../pages/PayPage/PayPage";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Profile from "../pages/Profile/Profile";
import SellerProduct from "../pages/SellerProduct/SellerProduct";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import SignUp from "../pages/SignUp/SignUp";
import Wishlist from "../pages/Wishlist/Wishlist";
import WomenCollection from "../pages/WomenCollection/WomenCollection";

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/seller-product" element={<SellerProduct />} />
        <Route path="/seller-product/new" element={<CreateSellerProduct />} />
        <Route path="/create-seller-product" element={<CreateSellerProduct />} />
        <Route path="/create-seller-product/:id" element={<CreateSellerProduct />} />
        <Route path="/collections/women" element={<WomenCollection />} />
        <Route path="/collections/men" element={<MenCollection />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categorySlug" element={<Categories />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
