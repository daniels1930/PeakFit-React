import "./styles/ShoppingCart.css";
import CartList from "./components/CartList";
import OrderSummary from "./components/OrderSummary";

const ShoppingCart = () => {
  return (
    <div className="cart-container">
      <h1 className="cart-title">
        MY SHOPPING CART
        <img
          className="cart-title-icon"
          src="/assets/images/pages/ShoppingCart/cart-title-icon.svg"
          alt=""
          width={40}
          height={40}
        />
      </h1>

      <div className="cart-content">
        <CartList />
        <OrderSummary />
      </div>
    </div>
  );
};

export default ShoppingCart;