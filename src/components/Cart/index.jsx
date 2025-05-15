import { useCart } from "../../context/CartContext"
const Cart = () => {
  const { cart, deleteFromCart, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return <p>Корзина порожня.</p>;
  }

  return (
    <div>
      <h2>Корзина</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} style={{ marginBottom: 10 }}>
            <strong>{item.name}</strong> — {item.quantity} шт.
            <br />
            <small>Конфігурація: {JSON.stringify(item.config)}</small>
            <br />
            <label>
              Кількість:
                <button onClick={(e) => updateQuantity(index, item.quantity - 1)}>-</button>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                style={{ width: "50px", marginLeft: "5px" }}
              />
              <button onClick={(e) => updateQuantity(index, item.quantity + 1)}>+</button>
            </label>
            <button onClick={() => deleteFromCart(index)} style={{ marginLeft: "10px" }}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Очистити корзину</button>
    </div>
  );
};

export default Cart;
