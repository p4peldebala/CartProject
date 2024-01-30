import {BsCartPlus} from 'react-icons/bs'
import { CardItem } from './CardItem.styles';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { priceFormater } from '../../utils/formater';
import { CartContext } from '../../context/CartContext';

export interface ProductsProps{
    "id": 1, 
    "title": string, 
    "description": string,
    "price":number,
    "cover": string
}

export const Home = () => {
    const [produtos, setProdutos] = useState<ProductsProps[]>([])
    const [productAdded , setProductAdded] = useState(false)

    const {addNewProductToCart} = useContext(CartContext)
   
    useEffect(()=>{
        const getData = async() => {
            const response =  await api.get('/products')
            setProdutos(response.data)
        }
        getData()
    },[])

    const handleAddNewProductToCart = (produto:ProductsProps) => {
        const data = {
          ...produto,
          amount: 1,
          total: produto.price
        }
        addNewProductToCart(data)
        
        setProductAdded(true)
        
        const interval = setTimeout(()=>{
          setProductAdded(false)
        }, 3000)
        
        if(productAdded === true){
          clearInterval(interval)
        }
        
        
    }
    return (
      <>
        {productAdded && (
          <div className='fixed inset-x-0 top-0'>
            <div className="h-10  animate-bounce mx-auto flex items-center rounded-lg mt-5 text-slate-600 font-bold justify-center w-96 bg-green-300">
              Produto adicionado com sucesso
            </div>
          </div>
          
        )}
        <main className="w-full max-w-7xl px-4 mx-auto">
          <h1 className="text-center font-bold my-8 text-2xl">
            Produtos em alta
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
            {produtos.map((produto) => {
              return (
                <CardItem
                  key={produto.id}
                  className="w-full flex items-center flex-col"
                >
                  <img
                    className="w-full h-max-70 rounded-lg max-h-72 mb-2 p-6"
                    src={produto.cover}
                  />
                  <p className="font-medium my-2 text-center p-2 h-10">
                    {produto.title}
                  </p>
                  <div className="flex gap-3 items-center m-4">
                    <strong className="text-zinc-600">
                      {priceFormater.format(produto.price)}
                    </strong>
                    <button
                      onClick={() => handleAddNewProductToCart(produto)}
                      className="bg-zinc-900 p-1 rounded"
                    >
                      <BsCartPlus size={20} color="#fff" />
                    </button>
                  </div>
                </CardItem>
              );
            })}
          </div>
        </main>
      </>
    );
}