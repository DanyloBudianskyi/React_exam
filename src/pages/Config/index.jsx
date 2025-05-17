import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { fetchData } from "../../hooks/fetchData"
import DrinkConfigurator from "../../components/DrinkConfigurator"
import PizzaConfigurator from "../../components/PizzaConfigurator"
import { useCart } from "../../context/CartContext"

const Config = () => {
    const {category, elementId} = useParams()
    const {data, isLoading, error} = fetchData(`/data/${category}.json`)

    const [item, setItem] = useState()
    const [price, setPrice] = useState(0)
    const [config, setConfig] = useState()

    const {addToCart} = useCart()

    const handleAddToCart = () => {
        addToCart({
            id: item.id,
            name: item.name,
            config,
            quantity: Number(config.quantity),
            price
        })
    }

    useEffect(() => {
        if(data && elementId){
            const selectedItem = data.find(item => item.id === elementId)
            setItem(selectedItem)
        
            if(selectedItem){
                if(category === "pizza"){
                    setConfig({ size:selectedItem.sizes[0].name, doughType:selectedItem.doughTypes[0], extras:[], quantity: 1})
                }
                else if(category ==="drinks"){
                    setConfig({volume: selectedItem.volumes[0].size, quantity: 1})
                }
            }
        }
    }, [data, elementId])
    useEffect(() => {
        document.title = "Config page"
    },[item])
    return(
        <div>
            {!item || !config ? <p>Завантаження...</p> : (
                <>
                    {category === "drinks" && (
                    <DrinkConfigurator item={item} config={config} setConfig={setConfig}  price={price} setPrice={setPrice} />
                    )}
                    {category === "pizza" && (
                    <PizzaConfigurator item={item} config={config} setConfig={setConfig} price={price} setPrice={setPrice} />
                    )}
                    <button onClick={handleAddToCart}>Add to cart</button>
                </>
            )}
        </div>
    )
}

export default Config