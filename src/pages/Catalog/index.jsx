import { Link, useParams } from "react-router"
import styles from "./Catalog.module.scss"
import { useEffect, useState } from "react"
import { fetchData } from "../../hooks/fetchData"

const Catalog = () => {
    const {category} = useParams()
    const {data, isLoading, error} = fetchData(`/data/${category}.json`)

    useEffect(() => {
      document.title = "Catalog"
    }, [category]);

    return(
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <h4>{item.description}</h4>
              <Link to={`/catalog/config/${category}/${item.id}`}><button>Customize</button></Link>
            </div>
          ))}
        </div>
    )
}

export default Catalog