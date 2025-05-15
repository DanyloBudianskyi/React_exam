import { useEffect } from "react"
import { Link } from "react-router"
import styles from "./ErrorPage.module.scss"

const ErrorPage = () => {
    useEffect(() => {
        document.title = "Page not found"
    },[])
    return(
        <div className={styles.container}>
            <h1>Page not found</h1>
            <Link to="/"><h4>Go to home page</h4></Link>
        </div>
    )
}

export default ErrorPage