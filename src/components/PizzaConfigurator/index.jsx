import { useEffect, useState } from "react"
import { EXTRAS } from "./extras"
import styles from "./PizzaConfigurator.module.scss"

const PizzaConfigurator = ({ item, config, setConfig, price, setPrice, onAddToCart}) => {
  
  useEffect(() => {
    const selectedSize = item.sizes.find(s => s.name === config.size)

    const extrasPrice = config.extras.reduce((sum, extra) => {
      const found = EXTRAS.find(e => e.name === extra)
      return sum + (found ? found.price : 0)
    }, 0)

    setPrice(selectedSize.price + extrasPrice)
  }, [config, item])

  const handleExtraChange = (e) => {
    const { value, checked } = e.target
    let updatedExtras = [...config.extras];

    if (checked) {
      updatedExtras.push(value);
    } else {
      updatedExtras = updatedExtras.filter(extra => extra !== value);
    }

    setConfig({ ...config, extras: updatedExtras })
  }

  const handleQuantityChange = (e) => {
    const quantity = e.target.value
    setConfig({ ...config, quantity })
  }

  return (
    <>
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{item.name}</h1>
      <div className={styles.photo}>
        <img src={item.imgSrc} alt="" />
      </div>
      <div className={styles.optionsBlock}>
        <label className={styles.size}>Розмір:
        <select
          value={config.size}
          onChange={(e) => setConfig({ ...config, size: e.target.value })}
        >
          {item.sizes.map(s => (
            <option key={s.name} value={s.name}>
              {s.name} - {s.price} грн
            </option>
          ))}
        </select>
      </label>

      <label className={styles.doughType}>Тип тіста:
        <select
          value={config.doughType}
          onChange={(e) => setConfig({ ...config, doughType: e.target.value })}
        >
          {item.doughTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>

      <fieldset className={styles.extra}>
        <legend>Додаткові інгредієнти:</legend>
        {EXTRAS.map(extra => (
          <label key={extra.name}>
            <input
              type="checkbox"
              value={extra.name}
              checked={config.extras.includes(extra.name)}
              onChange={handleExtraChange}
            />
            {extra.name} (+{extra.price} грн)
          </label>
        ))}
      </fieldset>
      </div>
      
      <label className={styles.quantity}>Кількість піц:
        <input
          type="number"
          value={config.quantity}
          min="1"
          onChange={handleQuantityChange}
          className={styles.quantityInput}
        />
      </label>

      <div className={styles.totalPrice}>Загальна ціна: {price * config.quantity} грн</div>
      <button onClick={onAddToCart} className={styles.addToCartBtn}>Add to cart</button>
      
    </div>
    
    </>
  )
}

export default PizzaConfigurator