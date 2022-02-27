import { Routes, Route, Redirect } from 'react-router-dom'
import React from 'react'

import Error404 from './Error404'
import Registrarse from './Registrarse'
import Login from './Login'
import Home from './Home'
import Logout from './Logout'
import Productos from './Productos'

import Header from '../components/Header'
import Footer from '../components/Footer'

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
  
        <Route path='/' element={<Home />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/productos" element={<Productos />} />
        <Route path='*' element={<Error404 />} />
        {/* <Redirect /> */}
      </Routes>
      <Footer />
    </React.Fragment>
  )
}

export default App
