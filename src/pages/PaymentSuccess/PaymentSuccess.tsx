import { useLocation } from "react-router-dom";
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
        <p className="page-kicker">Pago confirmado</p>
        <h1>Payment Success</h1>
        <p className="payment-success-page__subtitle">
          Confirmación de compra realizada correctamente.
        </p>

        <div className="payment-success-page__card">
          <div className="payment-success-page__row">
            <div className="payment-success-page__label">Estado</div>
            <div className="payment-success-page__value payment-success">
              ✅ Aprobado
            </div>
          </div>

          <div className="payment-success-page__row">
            <div className="payment-success-page__label">Total</div>
            <div className="payment-success-page__value">
              {typeof total === "number" ? `$${total}.00 USD` : "$-- USD"}
            </div>
          </div>

          {shipping && (
            <div className="payment-success-page__row">
              <div className="payment-success-page__label">Envío</div>
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

        <div className="payment-success-page__hint">
          Gracias por comprar en PeakFit.
        </div>
      </div>
    </main>
  );
}

export default PaymentSuccess;
