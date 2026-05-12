import CartItem from "./CartItem";
import "../styles/cartList.css";

import product1 from "/assets/images/pages/ShoppingCart/m1.png";
import product2 from "/assets/images/pages/ShoppingCart/m1.png";

const CartList = () => {
  const products = [
    {
      id: 1,
      name: "Set - Sports Top + High Impact Leggings",
      price: 62,
      image: product1,
    },
    {
      id: 2,
      name: "Sports jacket – Long sleeve with zipper",
      price: 62,
      image: product2,
    },
  ];

  return (
    <div className="cart-list">
      {products.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;