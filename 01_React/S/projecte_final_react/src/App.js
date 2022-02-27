import './App.css';
import React from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Productos from './Components/Productos'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Register from './Components/Register'
import Index from './Components/Index'
import Error from './Components/404'
import {
  Routes,
  Route
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <React.Fragment>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/productos" element={<Productos />}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default App;
