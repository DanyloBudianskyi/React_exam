import { useEffect, useState } from "react"
import { EXTRAS } from "./extras"

const PizzaConfigurator = ({ item, config, setConfig, price, setPrice }) => {
  
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
      <label>Розмір:
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

      <label>Тип тіста:
        <select
          value={config.doughType}
          onChange={(e) => setConfig({ ...config, doughType: e.target.value })}
        >
          {item.doughTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>

      <fieldset>
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

      <label>Кількість піц:
        <input
          type="number"
          value={config.quantity}
          min="1"
          onChange={handleQuantityChange}
        />
      </label>

      <div>Загальна ціна: {price * config.quantity} грн</div>
    </>
  )
}

export default PizzaConfigurator