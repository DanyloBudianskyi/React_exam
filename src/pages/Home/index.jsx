import { Link } from "react-router"
import { useEffect } from "react"
import MenuCard from "../../components/MenuCard"
import styles from "./Home.module.scss"

const Home = () => {
    useEffect(() => {
        document.title = "Home page"
    },[])
    return(
        <div className={styles.wrap}>
            <div className={styles.mainBlock}>
                <h2>Menu</h2>
                <Link to={`/catalog/products/pizza`}><MenuCard title="Pizza" imgSrc="https://static.vecteezy.com/system/resources/previews/046/861/103/non_2x/delicious-veggie-pizza-isolated-on-a-transparent-background-free-png.png"/></Link>
                <Link to={`/catalog/products/drinks`}><MenuCard title="Drinks" imgSrc="https://icons.veryicon.com/png/Food%20%26%20Drinks/Coke%20%26%20Pepsi%20Can/Coca%20Cola%20Can.png"/></Link>
            </div>
        </div>
    )
}

export default Home