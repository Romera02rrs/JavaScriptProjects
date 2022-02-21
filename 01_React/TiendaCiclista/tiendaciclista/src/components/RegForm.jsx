import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const RegForm = () => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Introducir nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="introducir email" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formPasswd">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>

                <Form.Group as={Col} controlId="formPasswdRepited">
                    <Form.Label>Repetir contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Repetir Contraseña" />
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Registrar
            </Button>
        </Form>
    )
}

export default RegForm