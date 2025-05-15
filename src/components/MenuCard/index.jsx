import styles from "./MenuCard.module.scss"

const MenuCard = ({title, imgSrc}) => {
    return(
        <div className={styles.card}>
            <h3>{title}</h3>
            <img src={imgSrc}/>
        </div>
    )
}

export default MenuCard