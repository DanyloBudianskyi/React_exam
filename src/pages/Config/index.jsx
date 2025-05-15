import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { fetchData } from "../../hooks/fetchData"
import DrinkConfigurator from "../../components/DrinkConfigurator"
import PizzaConfigurator from "../../components/PizzaConfigurator"

const Config = () => {
    const {category, elementId} = useParams()
    const {data, isLoading, error} = fetchData(`/data/${category}.json`)

    const [item, setItem] = useState()
    const [config, setConfig] = useState()
    useEffect(() => {
        if(data && elementId){
            const selectedItem = data.find(item => item.id === elementId)
            setItem(selectedItem)
        
            if(selectedItem){
                if(category === "pizza"){
                    setConfig({ size:selectedItem.sizes[1].name, doughType:selectedItem.doughTypes[0], extras:[], quantity: 1})
                }
                else if(category ==="drinks"){
                    setConfig({volume: selectedItem.volumes[0].size, quantity: 1})
                }
            }
        }
    }, [data, elementId])
    console.log(config)
    console.log(item)
    useEffect(() => {
        document.title = "Config page"
        console.log(item)
    },[item])
    return(
        <div>
            {!item || !config ? <p>Завантаження...</p> : (
                <>
                    {category === "drinks" && (
                    <DrinkConfigurator item={item} config={config} setConfig={setConfig} />
                    )}
                    {category === "pizza" && (
                    <PizzaConfigurator item={item} config={config} setConfig={setConfig} />
                    )}
                </>
            )}
        </div>
    )
}

export default Config