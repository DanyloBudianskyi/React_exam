import { Link } from "react-router"
import styles from "./DrinkItem.module.scss"

const DrinkItem = ({item}) => {
    return(
        <div className={styles.card}>
            <div className={styles.image}></div>
            <div className={styles.info}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Ціна починається з {item.volumes[0].price} грн</p>
                <Link to={`/catalog/config/drinks/${item.id}`}><button>Редагувати</button></Link>
            </div>
        </div>
    )
}

export default DrinkItem