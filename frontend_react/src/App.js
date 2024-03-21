import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Login from './Components/Login'
import Register from './Components/Register'
import Createitems from './Components/Createitems'
import Deleteuser from './Components/Deleteuser'
import DisplayItems from './Components/DisplayItems'
import spinner from './Components/spinner'


const App = () => {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Createitems' element={<Createitems/>}/>
      <Route path='/Deleteuser' element={<Deleteuser/>}/>
      <Route path='/Showitems' element={<DisplayItems/>}/>
      <Route path='/spinner' element={<spinner/>}/>
      
    </Routes>
    <Footer/>
    </BrowserRouter> 
  )
}

export default App