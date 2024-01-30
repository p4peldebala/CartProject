import React, { createContext, useEffect, useState } from "react";
import { ProductsProps } from "../pages/home";


// Interface dos itens do carrinho
interface CartProps extends ProductsProps{
    amount: number,
    total: number
}

// Interface do carrinho
interface CartContextData{
    cart: CartProps[],
    cartAmount: number,
    total: number, 

    addNewProductToCart: (newItem:CartProps) => void,
    removeProductToCart: (itemToRemove:CartProps) => void,
    
}

// Criando o Contexto
export const CartContext = createContext({} as CartContextData)

// Props do contexto
interface ContextProps{
    children: React.ReactNode
}


// Criando o Provider

export const CartProvider = ({children}:ContextProps) => {
    const [cart, setCart] = useState<CartProps[]>(() => {
      const cartStorage = localStorage.getItem("@project-cart:cart");

      if (cartStorage) {
        return JSON.parse(cartStorage);
      } else {
        return [];
      }
    });

    const[total, setTotal] = useState(() => {
        const totalInStorage = localStorage.getItem("@project-cart:total");
        
        if(totalInStorage){
            return JSON.parse(totalInStorage);
        }else{
            return 0
        }
    })

    // Funcao que adiciona um item ao carrinho
    const addNewProductToCart = (newItem:CartProps) => {
        const alreadyInsertedIndex = cart.findIndex(item => item.id === newItem.id)
         
        if(alreadyInsertedIndex !== -1){
            let cartList = cart

            const itemAlreadyInserted = cartList[alreadyInsertedIndex]
            
            itemAlreadyInserted.amount = itemAlreadyInserted.amount + 1
            itemAlreadyInserted.total = itemAlreadyInserted.price * itemAlreadyInserted.amount

            setCart(cartList)
            totalResultCart(cartList)
            return 
        }

        setCart(state => [...state, newItem])
        totalResultCart([...cart, newItem])
    }

    // Funcao que remove um item do carrinho

    const removeProductToCart = (productToRemove:CartProps) => {
        const indexItemToRemove = cart.findIndex(item => item.id === productToRemove.id)
        const itemToremove = cart[indexItemToRemove]
        
        if(itemToremove?.amount > 1){
            itemToremove.amount = itemToremove.amount - 1
            itemToremove.total = itemToremove.total - itemToremove.price
            setCart(state => [...state])
            return
        }

        const removeItem = cart.filter(product => product.id !== productToRemove.id)

        setCart(removeItem)
        totalResultCart(removeItem)
    }

    // Funcao para resgatar o total

    const totalResultCart = (items:CartProps[]) =>{
        let myCart = items;
        let result = myCart.reduce((acc, item) => {
            return acc + item.total
        }, 0)

        setTotal(result)
    }
    
    // Salvando o carrinho no localStorage

    useEffect(()=>{
        const cartStateJSON = JSON.stringify(cart)
        const totalStorage = cart.reduce((acc, produto) => {
            acc += produto.total
            return acc 
        }, 0)


        localStorage.setItem('@project-cart:cart', cartStateJSON)
        localStorage.setItem('@project-cart:total', JSON.stringify(totalStorage))
    },[cart])
    return(
        <CartContext.Provider value={{cart, cartAmount:cart.length, addNewProductToCart, removeProductToCart, total}}>
            {children}
        </CartContext.Provider>
    )
}