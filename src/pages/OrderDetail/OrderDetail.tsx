import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBackButton from "../../components/PageBackButton/PageBackButton";
import { supabase } from "../../lib/supabase";
import "./OrderDetail.css";

type OrderItem = {
  id: string;
  product_id: string;
  name: string;
  quantity: number;
  unit_price: number;
};

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  shipping_address: string;
};

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;
      const { data: orderData } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();
      if (!orderData) {
        navigate("/my-orders", { replace: true });
        return;
      }
      setOrder(orderData);

      const { data: itemsData } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);
      if (itemsData) setItems(itemsData);
      setLoading(false);
    }
    fetchOrder();
  }, [orderId, navigate]);

  if (loading) return <main className="order-detail-page"><p>Loading...</p></main>;
  if (!order) return null;

  return (
    <main className="order-detail-page">
      <PageBackButton />

      <section className="order-detail-header">
        <div>
          <p>Purchase details</p>
          <h1>Order {order.id.toUpperCase().slice(0, 8)}</h1>
        </div>
        <span>{order.status}</span>
      </section>

      <section className="order-detail-layout">
        <article className="order-detail-product">
          <div>
            <p className="order-detail-date">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
            <h2>Order summary</h2>
            {items.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${(item.unit_price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="order-detail-panel">
          <h2>Payment</h2>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{order.status}</dd>
            </div>
            <div className="order-detail-total">
              <dt>Total paid</dt>
              <dd>${order.total.toFixed(2)}</dd>
            </div>
          </dl>
        </article>

        <article className="order-detail-panel">
          <h2>Shipping</h2>
          <dl>
            <div>
              <dt>Address</dt>
              <dd>{order.shipping_address}</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}

export default OrderDetail;