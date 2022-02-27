import React, { useEffect, useState } from 'react';
import {
	Container,
	Table,
	Button,
	Modal,
	ModalBody,
	ModalFooter
} from 'react-bootstrap/';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Listado() {

	const nav = useNavigate();

	function validarToken() {
		var token = JSON.parse(localStorage.getItem("tk"))

		if (token == null) {
			nav("/login");
		}
	}

	const [productos, setProductos] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		validarToken()
		getProductos();
	}, []);

	const getProductos = () => {
		fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				"auth-token": JSON.parse(localStorage.getItem("tk"))
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setProductos(data.data.data);
			});
	};

	const formSchema = Yup.object().shape({
		name: Yup.string()
			.min(4, 'El nombre debe de tener más de 4 carácteres.')
			.max(60, 'El nombre debe de tener menos de 60 carácteres,')
			.required('Required'),
		price: Yup.number()
			.min(0, 'El precio debe de ser mayor que 0.')
			.required('Required'),
		size: Yup.string()
			.required('Required'),
	});

	const formik = useFormik({
		initialValues: { nombre: '', precio: 0, tallas: '' },
		validationSchema: formSchema,
	});

	const subirAPI = (value) => {
		console.log(value);
		let talla = value.size.split(",");
		let product = {
			'nombre': value.name,
			'precio': value.price,
			'tallas': talla
		}
		fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'auth-token': JSON.parse(localStorage.getItem("tk")),
			},
			body: JSON.stringify(product)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				getProductos();
				nav('/productos');
			})
	}

	const modificar = (elem) => {

		formik.values.id = elem._id;
		formik.values.nombre = elem.nombre;
		formik.values.precio = elem.precio;
		formik.values.tallas = elem.tallas.toString();
		setIsModalOpen(true);

	}

	const modificarApi = (e) => {
		e.preventDefault();
		let tallas = formik.values.tallas.trim().split(',');
		let product = {
			'nombre': formik.values.nombre,
			'precio': formik.values.precio,
			'tallas': tallas
		}

		fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos/' + formik.values.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'auth-token': JSON.parse(localStorage.getItem("tk")),
			},
			body: JSON.stringify(product)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				nav('/productos');
			})
	}

	return (
		<Container className='mt-3'>
			<h1>Productos</h1>
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCreate">Añadir producto</button>

			<div className="modal fade" id="modalCreate" tabIndex={"-1"} aria-labelledby="formCrear" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="formCrear">Nuevo producto</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<Formik initialValues={{ name: "", price: 0, size: "" }}
								validationSchema={formSchema}
								onSubmit={values => {
									console.log(values);
									subirAPI(values);
								}}>
								{({ errors, touched }) => (
									<Form>
										<div className='form-group'>
											<label htmlFor='name'>Nombre</label>
											<Field
												type='text'
												name='name'
												autoComplete='off'
												className='form-control'
											/>
											<ErrorMessage
												name='name'
												component='div'
												className='field-error text-danger'
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='price'>Precio</label>
											<Field
												type='number'
												name='price'
												autoComplete='off'
												className='form-control'
											/>
											<ErrorMessage
												name='price'
												component='div'
												className='field-error text-danger'
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='size'>Tallas</label>
											<Field
												type='text'
												name='size'
												className='form-control'
											/>
											<ErrorMessage
												name='size'
												component='div'
												className='field-error text-danger'
											/>
										</div>
										<div className="modal-footer">
											<Button type='submit' className='btn btn-primary mt-3 me-2'>Insertar</Button>
											<Button className='btn btn-primary mt-3' data-bs-dismiss="modal">Cancelar</Button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>

			<Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ModalHeader>
					<h1>Nou Producte</h1>
					<Button variant='secondary' onClick={() => setIsModalOpen(false)}>
						<i className='bi bi-x'></i>
					</Button>{' '}
				</ModalHeader>
				<ModalBody>
					<form>
						{/* Camp del nom del producte */}
						<label htmlFor="nombre" className='mb-2'>Nom del producte</label>
						<input
							type="text"
							name="nombre"
							className="form-control"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.nombre}
						/>
						{formik.touched.nombre && formik.errors.nombre ? (
							<div className="text-danger">{formik.errors.nombre}</div>) : null}
						{/* Camp del preu del producte */}
						<label htmlFor="precio" className='mt-2 mb-2'>Preu del producte</label>
						<input
							type="number"
							name="precio"
							className="form-control"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.precio}
						/>
						{formik.touched.precio && formik.errors.precio ? (
							<div className="text-danger">{formik.errors.precio}</div>) : null}
						<label htmlFor="talla" className='mt-2 mb-2'>Talla del producte</label>
						<input
							type="text"
							name="tallas"
							className="form-control"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.tallas}
						/>
						{formik.touched.tallas && formik.errors.tallas ? (
							<div className="text-danger">{formik.errors.tallas}</div>) : null}

						<button className='btn btn-primary' id={formik.values.id} onClick={(evt) => modificarApi(evt)}>
							Editar
						</button>
						<button className='btn btn-secondary' type="button" onClick={(evt) => { evt.preventDefault(); setIsModalOpen(false) }}>
							Cancelar
						</button>



					</form>
				</ModalBody>
				<ModalFooter>
				</ModalFooter>

			</Modal>

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
						return (
							<tr key={producto._id}>
								<td>{producto.nombre}</td>
								<td>{producto.precio}</td>
								<td>{producto.tallas}</td>
								<td>
									<button className='btn btn-primary' onClick={() => { modificar(producto) }}>
										<i className="bi bi-pencil-square"></i>
									</button>
									<button className='btn btn-danger' onClick={() => { console.log("borrar") }}>
										<i className="bi bi-trash3-fill"></i>
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>

		</Container>
	);
}

export default Listado;