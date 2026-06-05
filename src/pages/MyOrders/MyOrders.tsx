import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBackButton from '../../components/PageBackButton/PageBackButton';
import { supabase } from '../../lib/supabase';
import './MyOrders.css';
import '../Wishlist/Wishlist.css';

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  shipping_address: string;
};

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (data) setOrders(data);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) return <main className="wishlist-page"><p>Loading orders...</p></main>;

  return (
    <main className="wishlist-page">
      <PageBackButton />

      <section className="wishlist-header">
        <div className="wishlist-title" role="presentation">
          My Orders
          <img src="/assets/images/pages/Profile/Truck.png" alt="" />
        </div>
      </section>

      <section className="wishlist-grid">
        {orders.length === 0 && <p>You have no orders yet.</p>}
        {orders.map((order) => (
          <article key={order.id} className="mo-tarjeta">
            <p className="mo-fecha">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
            <div className="mo-tarjeta-fila">
              <div className="mo-info">
                <p className="mo-estado">
                  {order.status} <span className="mo-check">✓</span>
                </p>
                <p className="mo-llegada">{order.shipping_address}</p>
                <p className="mo-nombre-prod">Total: ${order.total.toFixed(2)}</p>
              </div>
              <div className="mo-acciones">
                <Link to={`/my-orders/${order.id}`} className="mo-btn-accion mo-btn-ver">
                  View purchase
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default MyOrders;