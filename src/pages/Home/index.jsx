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
                <Link to={`/catalog/products/pizza`}><MenuCard title="Pizza"/></Link>
                <Link to={`/catalog/products/drinks`}><MenuCard title="Drinks"/></Link>
            </div>
        </div>
    )
}

export default Home