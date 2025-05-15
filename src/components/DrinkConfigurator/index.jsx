import { useEffect, useState } from "react"

const DrinkConfigurator = ({item, config, setConfig}) => {
    const [price, setPrice] = useState(item.volumes[0].price)

    useEffect(() => {
        const selected = item.volumes.find(v => v.size === config.volume)
        if(selected) setPrice(selected.price * config.quantity)
    }, [config.volume, config.quantity, item.volumes])

    return(
        <>
            <label>Об’єм:
                <select
                value={config.volume}
                    onChange={(e) => setConfig({ ...config, volume: e.target.value })}
                >
                    {item.volumes.map((v) => (
                        <option key={v.size} value={v.size}>{v.size} ml - {v.price}</option>
                    ))}
                </select>
            </label>

            <label>Кількість:
                <input
                    type="number"
                    min={1}
                    value={config.quantity}
                    onChange={(e) => setConfig({ ...config, quantity: parseInt(e.target.value) })}
                />
                <div>Price: {price} uah</div>

                <button>Add to cart</button>
            </label>
        </>
    )
}

export default DrinkConfigurator