import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Header from '../components/Header'
import Footer from '../components/Footer'

import Registrarse from '../sites/Registrarse'
import Login from '../sites/Login'


function App() {
  return (
    <>
      <Router>
        <Route exact path="/" render={() => {
          return (
            <>
              <Header></Header>
              <Footer></Footer>
            </>
          )
        }} />
        <Route path="/registrarse" component={Registrarse} />
        <Route path="/login" component={Login} />
      </Router>
    </>
  )
}

export default App
