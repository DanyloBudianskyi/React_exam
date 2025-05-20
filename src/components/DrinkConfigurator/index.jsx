import { useEffect, useState} from "react"
import styles from "./DrinkConfigurator.module.scss"

const DrinkConfigurator = ({item, config, setConfig, price, setPrice, onAddToCart}) => {
  const [alert, setAlert] = useState(false)

  const showAlert = () => {
    setAlert(true)
    setTimeout(() => setAlert(false),3000)
  }
    
    useEffect(() => {
        const selected = item.volumes.find(v => v.size === config.volume)
        if(selected) setPrice(selected.price)
    }, [config.volume, config.quantity, item.volumes])

    return(
        <>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{item.name}</h1>
            <div className={styles.photo}>
                <img src={item.imgSrc} alt="" />
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
            <button onClick={() => {
                onAddToCart(); 
                showAlert()
            }} className={styles.addToCartBtn}>Add to cart</button>
            {alert && <div className={styles.itemAddedToCartAlert}>Товар додано до кошика</div>}
        </div>
        </>
    )
}

export default DrinkConfigurator