import { Link, useLocation } from "react-router-dom";
import { formatUsd } from "../../utils/price";
import "./PaymentSuccess.css";

type ShippingForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  postalCode: string;
};

type LocationState = {
  shipping?: ShippingForm;
  total?: number;
};

function PaymentSuccess() {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const shipping = state.shipping;
  const total = state.total;

  return (
    <main className="payment-success-page page-workspace">
      <div className="payment-success-page__container">
        <p className="page-kicker">Payment confirmed</p>
        <h1>Payment successful</h1>
        <p className="payment-success-page__subtitle">
          Your purchase was completed successfully.
        </p>

        <div className="payment-success-page__card">
          <div className="payment-success-page__row">
            <div className="payment-success-page__label">Status</div>
            <div className="payment-success-page__value payment-success">
              Approved
            </div>
          </div>

          <div className="payment-success-page__row">
            <div className="payment-success-page__label">Total</div>
            <div className="payment-success-page__value">
              {typeof total === "number" ? formatUsd(total) : "$-- USD"}
            </div>
          </div>

          {shipping && (
            <div className="payment-success-page__row">
              <div className="payment-success-page__label">Shipping</div>
              <div className="payment-success-page__value payment-success-page__address">
                {shipping.firstName} {shipping.lastName}
                <br />
                {shipping.address1}
                {shipping.address2 ? `, ${shipping.address2}` : ""}
                <br />
                {shipping.postalCode} - {shipping.city}
                <br />
                {shipping.country}
              </div>
            </div>
          )}
        </div>

        <div className="payment-success-page__actions">
          <Link className="payment-success-page__btn" to="/home">
            Continue shopping
          </Link>
          <Link className="payment-success-page__btn payment-success-page__btn--secondary" to="/my-orders">
            View my orders
          </Link>
        </div>

        <div className="payment-success-page__hint">
          Thank you for shopping at PeakFit.
        </div>
      </div>
    </main>
  );
}

export default PaymentSuccess;
