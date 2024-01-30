import { useContext } from 'react';
import {FaPlus, FaMinus} from 'react-icons/fa'
import { CartContext } from '../../context/CartContext';
import { priceFormater } from '../../utils/formater';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const {cart, addNewProductToCart, total, removeProductToCart} = useContext(CartContext)

    
    return (
      <div className="w-full max-w-7xl xl:mx-auto ">
        <h1 className="text-center font-bold my-8 text-2xl">Meu Carrinho</h1>
        {cart.length === 0 && (
            <div className='flex justify-center flex-col items-center gap-3'>
                <p className='font-semibold text-xl'>Ops carrinho vazio...</p>
                <Link className='text-blue-400  text-sm hover:border-b-2 hover:text-blue-600 border-b-blue-500' to={'/'}>Clique aqui para adicionar novos itens</Link>
            </div>
        )}

        {cart &&
          cart.map((produto) => {
            return (
                <section
                  key={produto.id}
                  className="flex justify-center items-center sm:justify-between mx-5 border-b-2 border-gray-300"
                >
                  <img
                    className=" w-20 h-max-70 flex-none rounded-lg max-h-72 mb-2 "
                    src={produto.cover}
                  />

                  <strong className="flex sm:shrink sm:w-20 flex-col sm:flex-row sm:gap-2">
                    <span>Preço:</span>
                    <p>{priceFormater.format(produto.price)}</p>
                  </strong>

                  <div className="flex sm:w-24 sm:shrink gap-3 justify-center items-center mx-5">
                    <button onClick={() => removeProductToCart(produto)}  className="bg-slate-600 hover:bg-indigo-900 rounded p-1 sm:p-2  text-white font-medium">
                      <FaMinus size={12} />
                    </button>
                    <p className="font-semibold">{produto.amount}</p>
                    <button onClick = {() => addNewProductToCart(produto)}className="bg-slate-600 hover:bg-indigo-900 rounded p-1 sm:p-2 text-center text-white font-medium">
                      <FaPlus size={12} />
                    </button>
                  </div>

                  <strong className="flex sm:shrink sm:w-48 flex-col sm:flex-row sm:gap-2">
                    <span>Subtotal:</span>
                    <p>{priceFormater.format(produto.total)}</p>
                  </strong>
                </section>
            );
            
          })}
          {(total) !== 0 && <p className="font-bold mt-4 mx-5">Total: {priceFormater.format(total)}</p>}
        
      </div>
    );
}
