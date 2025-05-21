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
    return(
      <div className={styles.emptyCart}>
        <p>Корзина порожня</p>
        <Link to="/"><p>Перейти к каталогу</p></Link>
      </div> 
    ) 
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.price}>      
        <h2>Корзина</h2>
        <h2>Загальна ціна: {totalPrice}</h2>
      </div>

      <ul>
        {cart.map((item, index) => (
          <li key={index} className={styles.container}>
            <img src={item.imgSrc}  className={styles.image} />
            <div className={styles.cartItem}>
              {item.name} — {item.quantity} шт.
              <small>Конфігурація: 
                <ul>
                  {Object.entries(item.config).filter(([key]) => key !== "quantity").map(([key, value]) => (
                    <li key={key}>
                      {configLabels[key]}: {Array.isArray(value) ? value.join(", ") : value}
                    </li>
                  ))}
                </ul>
              </small>
              <div className={styles.controls}>
                <div className={styles.priceBlock}>
                  <span className={styles.unitPrice}>Ціна за одиницю: {item.price} грн</span>
                  <span className={styles.totalPrice}>Сума: {item.price * item.quantity} грн</span>
                </div>

                <div className={styles.quantityBlock}>
                  <label>Кількість:</label>
                  <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                  />
                  <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                </div>
              </div>
            </div>
            
            <button onClick={() => deleteFromCart(index)} className={styles.deleteBtn}>
              X
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart} className={styles.cleanCartBtn}>Очистити корзину</button>
      
      <Link to="/checkout"><button className={styles.checkoutBtn}>Перейти к замовленню</button></Link>
    </div>
  );
};

export default Cart;
