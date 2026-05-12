import "../styles/orderSummary.css";

const OrderSummary = () => {
  return (
    <div className="summary">

      {/* LOGO */}
      <div className="logo">
        <img
          src="/assets/images/pages/ShoppingCart/logoAl.png"
          alt="logo"
          className="logo-img"
        />
      </div>

      {/* TITLE */}
      <h3>Order Summary</h3>

      {/* ITEMS */}
      <div className="summary-item">
        <span>Product</span>
        <span>$62 USD</span>
      </div>

      <div className="summary-item total">
        <span>Total</span>
        <span>$62 USD</span>
      </div>

      {/* BUTTON */}
      <button className="checkout-btn">
        Continue to checkout
      </button>

    </div>
  );
};

export default OrderSummary;