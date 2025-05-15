import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes} from "react-router";
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Config from "./pages/Config"

import './App.css'
import ErrorPage from './pages/ErrorPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <nav>
          <div className='mainPage'>
            <Link to="/"><h3>Pizza</h3></Link>
          </div>
          <div className='cart'> 
            <Link to="/cart"><h3>Cart</h3></Link>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/catalog/products/:category' element={<Catalog/>}/>
             <Route path='/catalog/config/:category/:elementId' element={<Config/>}/>
            <Route path='/*' element={<ErrorPage/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
