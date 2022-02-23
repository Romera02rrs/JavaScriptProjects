import LoginForm from "../components/LoginForm"
import Container from "react-bootstrap/Container"

const Login = () => {
    return (
        <>
            <Container className="mt-3">
                <h1 className="fw-light">Login</h1>
                <LoginForm />
            </Container>
        </>
    )
}

export default Login