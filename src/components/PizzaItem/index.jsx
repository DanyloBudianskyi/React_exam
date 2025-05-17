import { Link } from "react-router"
import styles from "./PizzaItem.module.scss"

const PizzaItem = ({item}) => {
    return(
        <div className={styles.card}>
            <div className={styles.image}></div>
            <div className={styles.info}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Ціна починається з {item.sizes[0].price} грн</p>
                <Link to={`/catalog/config/pizza/${item.id}`}><button>Редагувати</button></Link>
            </div>
        </div>
    )
}

export default PizzaItem