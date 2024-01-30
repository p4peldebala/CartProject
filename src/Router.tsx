import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/home'
import { Cart } from './pages/cart'
import { Layout } from './components/layout'

export const Router = () => {
    return(
        <Routes>
            <Route path='/' element ={<Layout/>}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/carrinho' element={<Cart/>}></Route>
            </Route>
        </Routes>
    )
}