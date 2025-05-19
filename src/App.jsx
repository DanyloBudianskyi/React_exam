import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes} from "react-router";
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Config from "./pages/Config"
import { CartProvider } from './context/CartContext.jsx'
import './App.css'
import ErrorPage from './pages/ErrorPage';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CartProvider>
      <BrowserRouter> 
        <nav>
          <div className='mainPage'>
            <Link to="/"><h3>Home</h3></Link>
          </div>
          <div className='cart'> 
            <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} /></Link>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/catalog/products/:category' element={<Catalog/>}/>
            <Route path='/catalog/config/:category/:elementId' element={<Config/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/*' element={<ErrorPage/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
          </Routes>
        </main>
      </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
