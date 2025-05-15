import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
    const[cart, setCart] = useState([])

    const exceptQuantity = (config) => {
        const { quantity, ...rest } = config;
        return rest;
    };

    const addToCart = (item) => {
        const existingIndex = cart.findIndex(
            i => i.id === item.id && JSON.stringify(exceptQuantity(i.config)) === JSON.stringify(exceptQuantity(item.config))
        );
        if(existingIndex !== -1) {
            const updatedCart = [...cart]
            updatedCart[existingIndex].quantity += item.quantity
            setCart(updatedCart)
        }
        else setCart([...cart, item])
    }

    const deleteFromCart = (itemIndex) => {
        setCart(cart.filter((_, i) => i !== itemIndex));
    }

    const updateQuantity = (index, quantity) => {
        if(quantity < 1) return
        console.log(index)
        const updatedCart = [...cart]
        updatedCart[index].quantity = quantity
        setCart(updatedCart)
    }

    const clearCart = () => setCart([])

    return(
        <CartContext.Provider value={{cart, addToCart, deleteFromCart, clearCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    )
}