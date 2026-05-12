import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [step, setStep] = useState<1 | 2>(1);
  const [shipping, setShipping] = useState<ShippingForm>(initialShipping);
  const [shippingErrors, setShippingErrors] = useState<Errors<ShippingForm>>(
    {},
  );

  const [confirmed, setConfirmed] = useState(false);
  const [confirmError, setConfirmError] = useState<string>("");

  // UI only: mock summary (can be replaced by cart state later)
  const summary = useMemo(
    () => ({
      items: [
        {
          id: "1",
          name: "Set - Sports Top + High Impact Leggings",
          qty: 1,
          price: 62,
        },
        {
          id: "2",
          name: "Sports jacket – Long sleeve with zipper",
          qty: 1,
          price: 62,
        },
      ],
      total: 124,
    }),
    [],
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
      if (!v) next[field] = "Este campo es obligatorio";
    }

    if (shipping.email.trim() && !isEmail(shipping.email.trim())) {
      next.email = "Ingresa un email válido";
    }

    if (shipping.phone.trim() && shipping.phone.trim().length < 7) {
      next.phone = "Ingresa un teléfono válido";
    }

    if (shipping.postalCode.trim() && shipping.postalCode.trim().length < 4) {
      next.postalCode = "Ingresa un código postal válido";
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

  function handleConfirmPurchase() {
    setConfirmError("");
    if (!confirmed) {
      setConfirmError("Debes confirmar para continuar");
      return;
    }

    navigate("/payment-success", {
      state: {
        shipping,
        total: summary.total,
      },
    });
  }

  return (
    <main className="pay-page page-workspace">
      <div className="pay-page__container">
        <div className="pay-page__header">
          <p className="page-kicker">Checkout</p>
          <h1>Pay Page</h1>
          <p className="pay-page__subtitle">
            Completa el envío y confirma tu compra.
          </p>
        </div>

        <div className="pay-page__wizard">
          <div className="pay-page__step-indicator">
            <div className={step === 1 ? "active" : ""}>1. Envío</div>
            <div className={step === 2 ? "active" : ""}>2. Confirmar</div>
          </div>

          {step === 1 && (
            <section className="pay-page__panel">
              <h2 className="pay-page__panel-title">Datos de envío</h2>

              <div className="grid-2">
                <label className="field">
                  <span>Nombre *</span>
                  <input
                    value={shipping.firstName}
                    onChange={(e) =>
                      handleShippingChange("firstName", e.target.value)
                    }
                    placeholder="Tu nombre"
                  />
                  {shippingErrors.firstName && (
                    <span className="error">{shippingErrors.firstName}</span>
                  )}
                </label>

                <label className="field">
                  <span>Apellido *</span>
                  <input
                    value={shipping.lastName}
                    onChange={(e) =>
                      handleShippingChange("lastName", e.target.value)
                    }
                    placeholder="Tu apellido"
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
                  <span>Teléfono *</span>
                  <input
                    value={shipping.phone}
                    onChange={(e) =>
                      handleShippingChange("phone", e.target.value)
                    }
                    placeholder="Ej: 555123456"
                  />
                  {shippingErrors.phone && (
                    <span className="error">{shippingErrors.phone}</span>
                  )}
                </label>
              </div>

              <label className="field">
                <span>Dirección *</span>
                <input
                  value={shipping.address1}
                  onChange={(e) =>
                    handleShippingChange("address1", e.target.value)
                  }
                  placeholder="Calle y número"
                />
                {shippingErrors.address1 && (
                  <span className="error">{shippingErrors.address1}</span>
                )}
              </label>

              <label className="field">
                <span>Depto / Piso (opcional)</span>
                <input
                  value={shipping.address2}
                  onChange={(e) =>
                    handleShippingChange("address2", e.target.value)
                  }
                  placeholder="Opcional"
                />
              </label>

              <div className="grid-3">
                <label className="field">
                  <span>Ciudad *</span>
                  <input
                    value={shipping.city}
                    onChange={(e) =>
                      handleShippingChange("city", e.target.value)
                    }
                    placeholder="Ciudad"
                  />
                  {shippingErrors.city && (
                    <span className="error">{shippingErrors.city}</span>
                  )}
                </label>

                <label className="field">
                  <span>País *</span>
                  <input
                    value={shipping.country}
                    onChange={(e) =>
                      handleShippingChange("country", e.target.value)
                    }
                    placeholder="País"
                  />
                  {shippingErrors.country && (
                    <span className="error">{shippingErrors.country}</span>
                  )}
                </label>

                <label className="field">
                  <span>Código postal *</span>
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
                  Cancelar
                </button>
                <button className="btn" type="button" onClick={handleNext}>
                  Siguiente
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="pay-page__panel">
              <h2 className="pay-page__panel-title">Confirmar compra</h2>

              <div className="summary">
                <div className="summary__section">
                  <h3>Resumen</h3>
                  <div className="summary__items">
                    {summary.items.map((it) => (
                      <div key={it.id} className="summary__row">
                        <div>
                          <div className="summary__name">{it.name}</div>
                          <div className="summary__meta">
                            Cantidad: {it.qty}
                          </div>
                        </div>
                        <div className="summary__price">${it.price}.00 USD</div>
                      </div>
                    ))}
                    <div className="summary__row total">
                      <div className="summary__name">Total</div>
                      <div className="summary__price">
                        ${summary.total}.00 USD
                      </div>
                    </div>
                  </div>
                </div>

                <div className="summary__section">
                  <h3>Envío</h3>
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
                  Confirmo que mis datos de envío son correctos y acepto
                  realizar el pago de <b>${summary.total}.00 USD</b>.
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
                  Atrás
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={handleConfirmPurchase}
                >
                  Confirmar compra
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
