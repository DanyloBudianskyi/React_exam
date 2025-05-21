import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useFetchData } from "../../hooks/fetchData"
import PizzaItem from "../../components/PizzaItem"
import DrinkItem from "../../components/DrinkItem"
import styles from "./Catalog.module.scss"

const Catalog = () => {
    const {category} = useParams()
    const {data, isLoading, error} = useFetchData(`/data/${category}.json`)

    const navigate = useNavigate()

    useEffect(() => {
      document.title = "Catalog"
    }, [category]);

    return(
        <div>
          <button onClick={() => navigate(-1)} className={styles.goBackBtn}>← Назад</button>
          {data.map((item) => {
            if(category === "pizza") return <PizzaItem key={item.id} item={item}/>
            else if(category === "drinks") return <DrinkItem key={item.id} item={item}/>
          })}
        </div>
    )
}

export default Catalog