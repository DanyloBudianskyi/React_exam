import { createContext, useState } from "react";

export const CartContext = createContext()

export const Cart = ({childern}) => {
    const [cartItems, setCartItems] = useState([])

    
}