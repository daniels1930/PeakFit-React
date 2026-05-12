import "./styles/shoppingCart.css";
import CartList from "./components/CartList"; // ✅ NO CarList
import OrderSummary from "./components/OrderSummary";

const ShoppingCart = () => {
  return (
    <div className="cart-container">
      <h1 className="cart-title">MY SHOPPING CART 🛍️</h1>

      <div className="cart-content">
        <CartList />
        <OrderSummary />
      </div>
    </div>
  );
};

export default ShoppingCart;