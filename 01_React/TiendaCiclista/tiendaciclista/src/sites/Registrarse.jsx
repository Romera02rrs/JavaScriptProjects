import Formulario from "../components/RegForm"
import Container from "react-bootstrap/Container"

const Registrarse = () => {
    return (
        <>
            <Container className="mt-3">
                <h1 className="fw-light">Registrar nuevo usuario</h1>
                <Formulario />
            </Container>
        </>
    )
}

export default Registrarse