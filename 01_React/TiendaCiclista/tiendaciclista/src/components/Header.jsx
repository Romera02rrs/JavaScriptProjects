import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";

const Header = () => {

    return (
        <>
            <Navbar bg="light" expand="sm">
                <Container fluid>
                    <Navbar.Brand href="/">Tienda Cliclistas</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#2">Productos</Nav.Link>
                            <Nav.Link href="#3">Pedidos</Nav.Link>
                            <NavDropdown title="Area Personal" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#4">Area Personal</NavDropdown.Item>
                                <NavDropdown.Item href="/registrarse">Registrarse</NavDropdown.Item>
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header