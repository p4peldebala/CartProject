import { useContext } from 'react'
import {FiShoppingCart} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

export const Header = () => {
    const {cartAmount} = useContext(CartContext)
    
    return (
      <header className="w-full px-1 bg-slate-200">
        <nav className="w-full max-w-7xl h-20 flex items-center justify-between mx-auto px-5">
          <Link to={"/"} className="text-lg font-bold">
            Dev Shop
          </Link>
          <Link to={"/carrinho"} className="relative">
            <FiShoppingCart size={28} color="#121212" />
            {cartAmount !== 0 && (
              <span className="absolute -top-3 -right-4 h-6 w-6 rounded-full bg-slate-500 flex justify-center items-center text-white text-xs">
                {cartAmount}
              </span>
            )}
          </Link>
        </nav>
      </header>
    );
}
