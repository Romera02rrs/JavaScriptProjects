import Header from "../components/Header"
import Footer from "../components/Footer"
import Formulario from "../components/RegForm"
import Container from "react-bootstrap/Container"

const Registrarse = () => {
    return (
        <>
            <Header />
            <Container className="mt-3">
                <h1 className="fw-light">Registrar nuevo usuario</h1>
                <Formulario />
            </Container>
            <Footer />
        </>
    )
}

export default Registrarse