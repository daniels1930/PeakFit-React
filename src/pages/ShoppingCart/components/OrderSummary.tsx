import { useNavigate } from "react-router-dom";
import "../styles/OrderSummary.css";
import { useCart } from "../../../context/CartContext";
import { formatUsd } from "../../../utils/price";

const OrderSummary = () => {
  const { lines, subtotal } = useCart();
  const navigate = useNavigate();
  const hasItems = lines.length > 0;

  return (
    <div className="summary">
      <div className="logo">
        <img
          src="/assets/images/pages/ShoppingCart/logoAl.png"
          alt="PeakFit"
          className="logo-img"
        />
      </div>

      <h3>Order Summary</h3>

      <div className="summary-item">
        <span>Products ({lines.reduce((n, l) => n + l.quantity, 0)})</span>
        <span>{hasItems ? formatUsd(subtotal) : "$0.00 USD"}</span>
      </div>

      <div className="summary-item total">
        <span>Total</span>
        <span>{hasItems ? formatUsd(subtotal) : "$0.00 USD"}</span>
      </div>

      <button
        type="button"
        className="checkout-btn"
        disabled={!hasItems}
        onClick={() => navigate("/pay")}
      >
        Continue to checkout
      </button>
    </div>
  );
};

export default OrderSummary;
