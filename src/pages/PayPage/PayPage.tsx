import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatUsd } from "../../utils/price";
import { supabase } from "../../lib/supabase";
import "./PayPage.css";

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

type Errors<T> = Partial<Record<keyof T, string>>;

const initialShipping: ShippingForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
  postalCode: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function PayPage() {
  const navigate = useNavigate();
  const { lines, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2>(1);
  const [shipping, setShipping] = useState<ShippingForm>(initialShipping);
  const [shippingErrors, setShippingErrors] = useState<Errors<ShippingForm>>({});

  const [confirmed, setConfirmed] = useState(false);
  const [confirmError, setConfirmError] = useState<string>("");
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (lines.length === 0 && !paid) {
      navigate("/cart", { replace: true });
    }
  }, [lines.length, navigate, paid]);

  const summary = useMemo(
    () => ({
      items: lines.map((line) => ({
        id: line.id,
        name: line.name,
        qty: line.quantity,
        lineTotal: line.unitPrice * line.quantity,
      })),
      total: subtotal,
    }),
    [lines, subtotal],
  );

  function handleShippingChange<K extends keyof ShippingForm>(
    key: K,
    value: ShippingForm[K],
  ) {
    setShipping((prev) => ({ ...prev, [key]: value }));
    setShippingErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateStep1(): boolean {
    const next: Errors<ShippingForm> = {};

    const required: (keyof ShippingForm)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address1",
      "city",
      "country",
      "postalCode",
    ];

    for (const field of required) {
      const v = shipping[field].trim();
      if (!v) next[field] = "This field is required";
    }

    if (shipping.email.trim() && !isEmail(shipping.email.trim())) {
      next.email = "Enter a valid email address";
    }

    if (shipping.phone.trim() && shipping.phone.trim().length < 7) {
      next.phone = "Enter a valid phone number";
    }

    if (shipping.postalCode.trim() && shipping.postalCode.trim().length < 4) {
      next.postalCode = "Enter a valid postal code";
    }

    setShippingErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    setConfirmError("");
    if (!validateStep1()) return;
    setStep(2);
  }

  function handleBack() {
    setConfirmError("");
    setStep(1);
  }

  async function handleConfirmPurchase() {
    setConfirmError("");
    if (!confirmed) {
      setConfirmError("Please confirm to continue");
      return;
    }

    const paidTotal = summary.total;

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;

    if (userId) {
      const { data: productRows } = await supabase
        .from("products")
        .select("id, seller_id, title, product_images(image_url, sort_order)")
        .in(
          "id",
          summary.items.map((item) => item.id)
        );
      const typedProductRows = (productRows ?? []) as Array<{
        id: string;
        seller_id: string;
        title: string;
        product_images?: Array<{ image_url: string; sort_order: number }>;
      }>;

      const { data: order } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          subtotal: paidTotal,
          shipping_cost: 0,
          tax: 0,
          total: paidTotal,
          status: "paid",
          shipping_first_name: shipping.firstName,
          shipping_last_name: shipping.lastName,
          shipping_email: shipping.email,
          shipping_phone: shipping.phone,
          shipping_address1: shipping.address1,
          shipping_address2: shipping.address2 || null,
          shipping_city: shipping.city,
          shipping_country: shipping.country,
          shipping_postal_code: shipping.postalCode,
          payment_method: "manual",
        })
        .select()
        .single();

      if (order) {
        const orderItems = summary.items.map((item) => ({
          order_id: order.id,
          product_id: item.id,
          seller_id: typedProductRows.find((product) => product.id === item.id)?.seller_id ?? userId,
          product_title: item.name,
          product_image: typedProductRows
            .find((product) => product.id === item.id)
            ?.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url ?? null,
          quantity: item.qty,
          unit_price: item.lineTotal / item.qty,
        }));
        await supabase.from("order_items").insert(orderItems);
      }
    }

    setPaid(true);
    clearCart();
    navigate("/payment-success", {
      state: {
        shipping,
        total: paidTotal,
      },
    });
  }

  if (lines.length === 0 && !paid) {
    return null;
  }

  return (
    <main className="pay-page page-workspace">
      <div className="pay-page__container">
        <div className="pay-page__header">
          <p className="page-kicker">Checkout</p>
          <h1>Checkout</h1>
          <p className="pay-page__subtitle">
            Complete your shipping details and confirm your purchase.
          </p>
        </div>

        <div className="pay-page__wizard">
          <div className="pay-page__step-indicator">
            <div className={step === 1 ? "active" : ""}>1. Shipping</div>
            <div className={step === 2 ? "active" : ""}>2. Confirm</div>
          </div>

          {step === 1 && (
            <section className="pay-page__panel">
              <h2 className="pay-page__panel-title">Shipping details</h2>

              <div className="grid-2">
                <label className="field">
                  <span>First name *</span>
                  <input
                    value={shipping.firstName}
                    onChange={(e) =>
                      handleShippingChange("firstName", e.target.value)
                    }
                    placeholder="Your first name"
                  />
                  {shippingErrors.firstName && (
                    <span className="error">{shippingErrors.firstName}</span>
                  )}
                </label>

                <label className="field">
                  <span>Last name *</span>
                  <input
                    value={shipping.lastName}
                    onChange={(e) =>
                      handleShippingChange("lastName", e.target.value)
                    }
                    placeholder="Your last name"
                  />
                  {shippingErrors.lastName && (
                    <span className="error">{shippingErrors.lastName}</span>
                  )}
                </label>
              </div>

              <div className="grid-2">
                <label className="field">
                  <span>Email *</span>
                  <input
                    type="email"
                    value={shipping.email}
                    onChange={(e) =>
                      handleShippingChange("email", e.target.value)
                    }
                    placeholder="tu@email.com"
                  />
                  {shippingErrors.email && (
                    <span className="error">{shippingErrors.email}</span>
                  )}
                </label>

                <label className="field">
                  <span>Phone *</span>
                  <input
                    value={shipping.phone}
                    onChange={(e) =>
                      handleShippingChange("phone", e.target.value)
                    }
                    placeholder="e.g. 555123456"
                  />
                  {shippingErrors.phone && (
                    <span className="error">{shippingErrors.phone}</span>
                  )}
                </label>
              </div>

              <label className="field">
                <span>Address *</span>
                <input
                  value={shipping.address1}
                  onChange={(e) =>
                    handleShippingChange("address1", e.target.value)
                  }
                  placeholder="Street and number"
                />
                {shippingErrors.address1 && (
                  <span className="error">{shippingErrors.address1}</span>
                )}
              </label>

              <label className="field">
                <span>Apt / suite (optional)</span>
                <input
                  value={shipping.address2}
                  onChange={(e) =>
                    handleShippingChange("address2", e.target.value)
                  }
                  placeholder="Optional"
                />
              </label>

              <div className="grid-3">
                <label className="field">
                  <span>City *</span>
                  <input
                    value={shipping.city}
                    onChange={(e) =>
                      handleShippingChange("city", e.target.value)
                    }
                    placeholder="City"
                  />
                  {shippingErrors.city && (
                    <span className="error">{shippingErrors.city}</span>
                  )}
                </label>

                <label className="field">
                  <span>Country *</span>
                  <input
                    value={shipping.country}
                    onChange={(e) =>
                      handleShippingChange("country", e.target.value)
                    }
                    placeholder="Country"
                  />
                  {shippingErrors.country && (
                    <span className="error">{shippingErrors.country}</span>
                  )}
                </label>

                <label className="field">
                  <span>Postal code *</span>
                  <input
                    value={shipping.postalCode}
                    onChange={(e) =>
                      handleShippingChange("postalCode", e.target.value)
                    }
                    placeholder="00000"
                  />
                  {shippingErrors.postalCode && (
                    <span className="error">{shippingErrors.postalCode}</span>
                  )}
                </label>
              </div>

              <div className="pay-page__actions">
                <button className="btn secondary" type="button" disabled>
                  Cancel
                </button>
                <button className="btn" type="button" onClick={handleNext}>
                  Next
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="pay-page__panel">
              <h2 className="pay-page__panel-title">Confirm purchase</h2>

              <div className="summary">
                <div className="summary__section">
                  <h3>Summary</h3>
                  <div className="summary__items">
                    {summary.items.map((it) => (
                      <div key={it.id} className="summary__row">
                        <div>
                          <div className="summary__name">{it.name}</div>
                          <div className="summary__meta">Qty: {it.qty}</div>
                        </div>
                        <div className="summary__price">{formatUsd(it.lineTotal)}</div>
                      </div>
                    ))}
                    <div className="summary__row total">
                      <div className="summary__name">Total</div>
                      <div className="summary__price">{formatUsd(summary.total)}</div>
                    </div>
                  </div>
                </div>

                <div className="summary__section">
                  <h3>Shipping</h3>
                  <div className="ship">
                    <div>
                      {shipping.firstName} {shipping.lastName}
                    </div>
                    <div className="ship__line">
                      {shipping.address1}
                      {shipping.address2 ? `, ${shipping.address2}` : ""}
                    </div>
                    <div className="ship__line">
                      {shipping.postalCode} - {shipping.city}
                    </div>
                    <div className="ship__line">{shipping.country}</div>
                  </div>
                </div>
              </div>

              <label className="check">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                />
                <span>
                  I confirm my shipping details are correct and I agree to pay{" "}
                  <b>{formatUsd(summary.total)}</b>.
                </span>
              </label>

              {confirmError && (
                <div className="error block">{confirmError}</div>
              )}

              <div className="pay-page__actions">
                <button
                  className="btn secondary"
                  type="button"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={handleConfirmPurchase}
                >
                  Confirm purchase
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

export default PayPage;
