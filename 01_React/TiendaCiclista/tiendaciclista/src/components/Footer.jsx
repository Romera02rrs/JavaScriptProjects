import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <footer>
            <Container fluid className="mt-5 fixed-bottom">
                <p className="text-center">&copy; 2022 Copyright - Tienda Ciclista - <span className="fw-bold">Exercici Final React</span></p>
            </Container>
        </footer>
    )
}

export default Footer;