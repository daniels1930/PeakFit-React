import "../styles/CartItem.css";
import { useCart, type CartLine } from "../../../context/CartContext";
import { formatUsd } from "../../../utils/price";

type Props = {
  item: CartLine;
};

const CartItem = ({ item }: Props) => {
  const { increment, decrement, removeLine } = useCart();
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="item-image" />

      <div className="item-info">
        <h3>{item.name}</h3>
        <p className="price">{formatUsd(lineTotal)}</p>
        <p className="unit-note">
          {item.quantity} × {formatUsd(item.unitPrice)}
        </p>

        <div className="quantity">
          <button type="button" aria-label="Decrease quantity" onClick={() => decrement(item.id)}>
            −
          </button>
          <span>{item.quantity}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => increment(item.id)}>
            +
          </button>
        </div>
      </div>

      <button
        className="delete-btn"
        type="button"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => removeLine(item.id)}
      >
        <img src="/assets/images/pages/ShoppingCart/trash-icon.svg" alt="" width={22} height={22} />
      </button>
    </div>
  );
};

export default CartItem;
