import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';

const Usuarios = () => {

    const [Users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data)
            })
    }, [])

    return (
        <React.Fragment>
            <h1>Pedidos</h1>
            <Button onClick={() => { console.log('agregar Pedido'); }}>Agregar Pedido</Button>

            <table className="table ">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>email</th>
                        <th>telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Users.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { console.log("modificar"); }}></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { console.log("borrar") }}></button>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Usuarios