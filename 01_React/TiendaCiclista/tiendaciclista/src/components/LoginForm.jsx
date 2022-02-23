import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const LoginForm = () => {
    return (
        <Form>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="introducir email" />
            </Form.Group>

            <Form.Group className="mb-3"  controlId="formPasswd">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Registrar
            </Button>
        </Form>
    )
}

export default LoginForm