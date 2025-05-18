import { Link } from "react-router";
import { useCart } from "../../context/CartContext"
import styles from "./Cart.module.scss"

const configLabels = {
  doughType: "Тісто",
  extras: "Начинки",
  size: "Розмір",
  volume: "Обʼєм",
  quantity: "Кількість",
};

const Cart = () => {
  const { cart, deleteFromCart, updateQuantity, clearCart, totalPrice} = useCart();

  if (cart.length === 0) {
    return <p>Корзина порожня.</p>;
  }
  return (
    <div className={styles.wrapper}>
      <h2>Корзина</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className={styles.container}>
            <img src=""  className={styles.image} />
            <div className={styles.cartItem}>
              <strong>{item.name}</strong> — {item.quantity} шт.
              <br />
              <small>Конфігурація: 
                <ul style={{ marginLeft: "1rem", fontStyle: "italic" }}>
                  {Object.entries(item.config).filter(([key]) => key !== "quantity").map(([key, value]) => (
                    <li key={key}>
                      {configLabels[key]}: {Array.isArray(value) ? value.join(", ") : value}
                    </li>
                  ))}
                </ul>
              </small>
              <br />
              <label>
                Кількість:
                <button onClick={(e) => updateQuantity(index, item.quantity - 1)}>-</button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                  
                />
                <button onClick={(e) => updateQuantity(index, item.quantity + 1)}>+</button>
              </label>
            </div>
            
            <button onClick={() => deleteFromCart(index)} className={styles.deleteBtn}>
              X
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Очистити корзину</button>
      <h2>Totat price: {totalPrice}</h2>
      <Link to="/checkout"><button className={styles.checkoutBtn}>Перейти к замовленню</button></Link>
    </div>
  );
};

export default Cart;
