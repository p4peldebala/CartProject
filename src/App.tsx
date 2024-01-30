import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { CartProvider } from "./context/CartContext"

function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Router/>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
