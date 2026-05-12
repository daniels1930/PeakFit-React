import "../styles/cartItem.css";

const CartItem = ({ item }: any) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="item-image" />

      <div className="item-info">
        <h3>{item.name}</h3>
        <p className="price">${item.price}.00 USD</p>

        <div className="quantity">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
      </div>

      <button className="delete-btn">🗑️</button>
    </div>
  );
};

export default CartItem;