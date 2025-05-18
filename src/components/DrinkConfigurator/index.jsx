import { useEffect} from "react"
import styles from "./DrinkConfigurator.module.scss"

const DrinkConfigurator = ({item, config, setConfig, price, setPrice, onAddToCart}) => {
    useEffect(() => {
        const selected = item.volumes.find(v => v.size === config.volume)
        if(selected) setPrice(selected.price)
    }, [config.volume, config.quantity, item.volumes])

    return(
        <>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{item.name}</h1>
            <div className={styles.photo}>
                <img src="https://icons.veryicon.com/png/Food%20%26%20Drinks/Coke%20%26%20Pepsi%20Can/Coca%20Cola%20Can.png" alt="" />
            </div>
            <div className={styles.optionsBlock}>
                <label className={styles.volumes}>Об’єм:
                    <select
                        value={config.volume}
                        onChange={(e) => setConfig({ ...config, volume: e.target.value })}
                    >
                    {item.volumes.map((v) => (
                        <option key={v.size} value={v.size}>{v.size} ml - {v.price}</option>
                    ))}
                    </select>
                </label>

                <label className={styles.quantity}>Кількість:
                    <input
                        type="number"
                        min={1}
                        value={config.quantity}
                        onChange={(e) => setConfig({ ...config, quantity: parseInt(e.target.value) })}
                    />
                </label>
            </div>

            
            <div className={styles.totalPrice}>Загальна ціна: {price * config.quantity} грн</div>
            <button onClick={onAddToCart} className={styles.addToCartBtn}>Add to cart</button>
        </div>
        </>
    )
}

export default DrinkConfigurator