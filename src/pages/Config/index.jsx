import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useFetchData } from "../../hooks/fetchData"
import DrinkConfigurator from "../../components/DrinkConfigurator"
import PizzaConfigurator from "../../components/PizzaConfigurator"
import { useCart } from "../../context/CartContext"
import styles from "../Catalog/Catalog.module.scss"

const Config = () => {
    const {category, elementId} = useParams()
    const {data} = useFetchData(`/data/${category}.json`)

    const [item, setItem] = useState()
    const [price, setPrice] = useState(0)
    const [config, setConfig] = useState()

    const {addToCart} = useCart()

    const navigate = useNavigate()

    const handleAddToCart = () => {
        addToCart({
            id: item.id,
            name: item.name,
            config,
            quantity: Number(config.quantity),
            price,
            imgSrc: item.imgSrc
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
                    <button onClick={() => navigate(-1)} className={styles.goBackBtn}>← Назад</button>
                    {category === "drinks" && (
                    <DrinkConfigurator item={item} config={config} setConfig={setConfig} price={price} setPrice={setPrice} onAddToCart={handleAddToCart}/>
                    )}
                    {category === "pizza" && (
                    <PizzaConfigurator item={item} config={config} setConfig={setConfig} price={price} setPrice={setPrice} onAddToCart={handleAddToCart}/>
                    )}
                    
                </>
            )}
        </div>
    )
}

export default Config