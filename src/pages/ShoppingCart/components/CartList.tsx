import CartItem from "./CartItem";
import "../styles/CartList.css";
import { useCart } from "../../../context/CartContext";

const CartList = () => {
  const { lines } = useCart();

  if (lines.length === 0) {
    return (
      <div className="cart-list cart-list-empty">
        <p>Your cart is empty.</p>
        <p className="cart-list-empty-hint">Browse products and tap “Add to cart” on any item.</p>
      </div>
    );
  }

  return (
    <div className="cart-list">
      {lines.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
