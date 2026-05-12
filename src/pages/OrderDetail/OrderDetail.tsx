import { Link, Navigate, useParams } from "react-router-dom";
import PageBackButton from "../../components/PageBackButton/PageBackButton";
import { myOrders } from "../../data/myOrders";
import "./OrderDetail.css";

function OrderDetail() {
  const { orderId } = useParams();
  const order = myOrders.find((item) => item.id === orderId);

  if (!order) {
    return <Navigate to="/my-orders" replace />;
  }

  return (
    <main className="order-detail-page">
      <PageBackButton />

      <section className="order-detail-header">
        <div>
          <p>Purchase details</p>
          <h1>Order {order.id.toUpperCase()}</h1>
        </div>
        <span>{order.status}</span>
      </section>

      <section className="order-detail-layout">
        <article className="order-detail-product">
          <img src={order.line.image} alt={order.line.name} />
          <div>
            <p className="order-detail-date">{order.purchaseDate}</p>
            <h2>{order.line.name}</h2>
            <p>Delivered on {order.arrivalDate}</p>
            <p>Quantity: {order.line.quantity}</p>
            <strong>{order.line.price}</strong>
            <Link to={`/products/${order.line.productId}`}>Repurchase</Link>
          </div>
        </article>

        <article className="order-detail-panel">
          <h2>Payment</h2>
          <dl>
            <div>
              <dt>Payment method</dt>
              <dd>
                {order.payment.method} ending in {order.payment.lastFour}
              </dd>
            </div>
            <div>
              <dt>Transaction</dt>
              <dd>{order.payment.transactionId}</dd>
            </div>
            <div>
              <dt>Subtotal</dt>
              <dd>{order.payment.subtotal}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{order.payment.shipping}</dd>
            </div>
            <div>
              <dt>Tax</dt>
              <dd>{order.payment.tax}</dd>
            </div>
            <div className="order-detail-total">
              <dt>Total paid</dt>
              <dd>{order.payment.total}</dd>
            </div>
          </dl>
        </article>

        <article className="order-detail-panel">
          <h2>Shipping</h2>
          <dl>
            <div>
              <dt>Recipient</dt>
              <dd>{order.shipping.recipient}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{order.shipping.address}</dd>
            </div>
            <div>
              <dt>Carrier</dt>
              <dd>{order.shipping.carrier}</dd>
            </div>
            <div>
              <dt>Tracking</dt>
              <dd>{order.shipping.trackingNumber}</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}

export default OrderDetail;
