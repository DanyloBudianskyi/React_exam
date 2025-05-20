import { Link, useParams } from "react-router"
import { useEffect, useState } from "react"
import { useFetchData } from "../../hooks/fetchData"
import PizzaItem from "../../components/PizzaItem"
import DrinkItem from "../../components/DrinkItem"

const Catalog = () => {
    const {category} = useParams()
    const {data, isLoading, error} = useFetchData(`/data/${category}.json`)

    useEffect(() => {
      document.title = "Catalog"
    }, [category]);

    return(
        <div>
          {data.map((item) => {
            if(category === "pizza") return <PizzaItem key={item.id} item={item}/>
            else if(category === "drinks") return <DrinkItem key={item.id} item={item}/>
          })}
        </div>
    )
}

export default Catalog