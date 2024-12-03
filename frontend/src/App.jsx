import React from 'react'
import Url from './Pages/Url'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Signin from './Pages/SignIn'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signin' element={<Signin/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App