import Header from "../components/Header"
import Footer from "../components/Footer"
import LoginForm from "../components/LoginForm"
import Container from "react-bootstrap/Container"

const Login = () => {
    return (
        <>
            <Header />
            <Container className="mt-3">
                <h1 className="fw-light">Login</h1>
                <LoginForm />
            </Container>
            <Footer />

        </>
    )
}

export default Login