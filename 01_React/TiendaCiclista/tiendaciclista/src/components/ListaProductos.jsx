import Producto from "./Producto";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { Container, Table, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap/';
import React, { useEffect, useState } from 'react';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

var token

const ListaProductos = () => {



    const redireccionar = useNavigate();

    const [productos, setProductos] = useState([]);
    const [newModal, setNewModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        comprobarToken(redireccionar)
        obtenerApiProductos();
    }, []);

    const obtenerApiProductos = () => {
        fetch("https://api.tendaciclista.ccpegoilesvalls.es/api/productos", {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "auth-token": token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProductos(data.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const crearProducto = (e) => {
        e.preventDefault()

        let producto = {
            'nombre': FKform.values.nombre,
            'precio': FKform.values.precio,
            'tallas': FKform.values.tallas.split(",")
        }

        console.log(producto);

        fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(producto)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                obtenerApiProductos();
            })
    }

    const modalOpen = () => {

        setNewModal(true);

        FKform.values.precio = "0";
        FKform.values.tallas = "";
        FKform.values.nombre = "";
    }

    const productSchema = Yup.object().shape({

        name: Yup.string().max(60, 'Demasiado Largo!').min(4, 'Demasiado corto!').required('Required!'),
        price: Yup.number().required('Required!').min(0, 'No puede ser gratis cacho perro'),
        size: Yup.string().required('Required!')
    });

    const modificar = (e) => {

        setIsModalOpen(true);

        FKform.values.id = e._id;
        FKform.values.precio = e.precio;
        FKform.values.tallas = e.tallas.toString();
        FKform.values.nombre = e.nombre;

    }

    const modificarPoducto = (e) => {
		e.preventDefault();
		let producto = {
			'nombre': FKform.values.nombre,
			'precio': FKform.values.precio,
			'tallas': FKform.values.tallas.trim().split(',')
		}

		fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos/' + FKform.values.id, {
			method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(producto)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				redireccionar('/productos');
			})
	}

    const FKform = useFormik({

        initialValues: { nombre: '', precio: 0, tallas: '' },

        validationSchema: productSchema,
    });

    return (
        <Container className='mt-3'>

            <h1 className="fw-light">Productos</h1>
            <Button type="button" className="btn btn-primary" data-bs-toggle="modal" onClick={modalOpen} data-bs-target="#modalCreate">Añadir producto</Button>


            <Table>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Tallas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id='pare'>
                    {productos.map(producto => {
                        <Producto variant={producto} />
                        return (
                            <tr key={producto._id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>

                                <td>{producto.tallas}</td>
                                <td>
                                    <Button className='btn btn-primary' onClick={() => { modificar(producto) }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>

                                    <Button className='btn btn-danger'>
                                        <i className="bi bi-trash3-fill"></i>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalHeader>
                    <h1>Editar Producto</h1>
                    <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
                        <i className='bi bi-x'></i>
                    </Button>{' '}

                </ModalHeader>
                <ModalBody>
                    <form>
                        {/* Camp del nom del producte */}
                        <label htmlFor="nombre" className='mb-2'>Nombre</label>
                        <input

                            type="text"
                            name="nombre"
                            className="form-control"
                            onChange={FKform.handleChange}
                            onBlur={FKform.handleBlur}

                        
                            value={FKform.values.nombre}
                        />
                        {FKform.touched.nombre && FKform.errors.nombre ? (
                            <div className="text-danger">{FKform.errors.nombre}</div>) : null}
                        {/* Camp del preu del producte */}
                        <label htmlFor="precio" className='mt-2 mb-2'>Precio</label>

                        <input
                            type="number"
                            name="precio"
                            className="form-control"
                            onChange={FKform.handleChange}
                            onBlur={FKform.handleBlur}

                            value={FKform.values.precio}
                        />
                        {FKform.touched.precio && FKform.errors.precio ? (
                            <div className="text-danger">{FKform.errors.precio}</div>) : null}v
                        {/* Camp del talla del producte */}
                        <label htmlFor="talla" className='mt-2 mb-2'>Talla</label>
                        <input
                            type="text"

                            name="tallas"
                            className="form-control"
                            onChange={FKform.handleChange}
                            onBlur={FKform.handleBlur}

                            value={FKform.values.tallas}
                        />
                        {FKform.touched.tallas && FKform.errors.tallas ? (
                            <div className="text-danger">{FKform.errors.tallas}</div>) : null}

                        <Button className='btn btn-primary' id={FKform.values.id} onClick={(evt) => modificarPoducto(evt)}>
                            Editar
                        </Button>
                        <Button className='btn btn-secondary' type="button" onClick={(evt) => { evt.preventDefault(); setIsModalOpen(false) }}>
                            Cancelar
                        </Button>


                    </form>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>

            </Modal>

            <Modal show={newModal} onClose={() => setNewModal(false)}>
                <ModalHeader>
                    <h1>Nuevo Producto</h1>
                    <Button variant='secondary' onClick={() => setNewModal(false)}>
                        <i className='bi bi-x'></i>
                    </Button>{' '}
                </ModalHeader>
                <ModalBody>
                    <form>
                        {/* Camp del nom del producte */}
                        <label htmlFor="nombre" className='mb-2'>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            onChange={FKform.handleChange}
                            onBlur={FKform.handleBlur}


                            value={FKform.values.nombre}
                        />
                        {FKform.touched.nombre && FKform.errors.nombre ? (
                            <div className="text-danger">{FKform.errors.nombre}</div>) : null}
                        {/* Camp del preu del producte */}
                        <label htmlFor="precio" className='mt-2 mb-2'>Precio</label>
                        <input
                            type="number"


                            name="precio"
                            className="form-control"
                            onChange={FKform.handleChange}
                            onBlur={FKform.handleBlur}
                            value={FKform.values.precio}
                        />
                        {FKform.touched.precio && FKform.errors.precio ? (
                            <div className="text-danger">{FKform.errors.precio}</div>) : null}
                        <label htmlFor="talla" className='mt-2 mb-2'>Talla</label>
                        <input
                            type="text"
                            name="tallas"
                            className="form-control"
                            onChange={FKform.handleChange}
                            onBlur={FKform.handleBlur}
                            value={FKform.values.tallas}
                        />
                        {FKform.touched.tallas && FKform.errors.tallas ? (
                            <div className="text-danger">{FKform.errors.tallas}</div>) : null}

                        <Button className='btn btn-primary' id={FKform.values.id} onClick={(evt) => crearProducto(evt)}>
                            Añadir
                        </Button>
                        <Button className='btn btn-secondary' type="button" onClick={(evt) => { evt.preventDefault(); setNewModal(false) }}>
                            Salir
                        </Button>

                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>

            </Modal>

        </Container>
    );
}

function comprobarToken(redireccionar) {
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if (tokenAux) {
        token = tokenAux
        console.log(token);
    } else {
        redireccionar('/login')
    }
}

export default ListaProductos