import React from "react";
import {
    Form,
    Button,
} from 'react-bootstrap/';

function Logout() {
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("tk");
        window.location.href = '/';
    }
    return (
        <div>
            <h1>
                Logout
            </h1>
            <h3>
                Quieres salir de tu perfil de usuario?
            </h3>
            <Form onSubmit={logout}>
                <Button variant="primary" type="submit">
                    Salir
                </Button>
            </Form>
        </div>
    )
}

export default Logout;