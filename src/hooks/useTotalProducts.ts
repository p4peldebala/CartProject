import { useContext } from "react";
import { CartContext } from "../context/CartContext";



export const useTotalProducts = () => {
    const {cart} = useContext(CartContext)
    
    const total = cart.reduce((acc, produto) => {
        acc += produto.total
        return acc 
    }, 0)

    return total
}