import React from "react";
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
            .min(6, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Required'),
    email: Yup.string()
            .min(6, 'Too Short!')
            .max(1024, 'Too Long!')
            .email('Invalid email')
            .required('Required'),
    password: Yup.string()
            .min(6, 'Too Short!')
            .required('Required'),
    passwordc: Yup.string()
            .min(6, 'Too Short!')
            .max(20, 'Too Long!')
            .oneOf([Yup.ref('password'), null], "Passwords don't match!")
            .required('Required'),
});

function Register() {
    const register = (value) =>{
        console.log("AA");
        let user = {
            'name':value.name,
            'email':value.email,
            'password':value.password
        }
        fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/register', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
        })
        
    }

    return (
        <div>
            <Formik initialValues={{ name: "", email: "", password: ""}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                    register(values);
                }}
            >
                {({ errors, touched }) => (
                    <div>
                        <div className="row mb-5">
                            <div className="col-lg-12">
                                <h1 className="mt-5">Registrar nuevo usuario</h1>
                            </div>
                        </div>
                        <Form>
                        <div className="mb-3 row">
                                <div className="col-12">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Introduce nombre"
                                        autoComplete="off"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name='name'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="mb-3 row">
                                    <div className="col-12">
                                        <label htmlFor="email">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Introduce email"
                                            autoComplete="off"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name='email'
                                            component='div'
                                            className='field-error text-danger'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor='password'>Contraseña</label>
                                        <Field
                                            type='password'
                                            name='password'
                                            placeholder='Introducir contraseña'
                                            className='form-control'
                                        />
                                        <ErrorMessage
                                            name='password'
                                            component='div'
                                            className='field-error text-danger'
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor='passwordc'>Repetir contraseña</label>
                                        <Field
                                            type='password'
                                            name='passwordc'
                                            placeholder='Repetir contraseña'
                                            className='form-control'
                                        />
                                        <ErrorMessage
                                            name='passwordc'
                                            component='div'
                                            className='field-error text-danger'
                                        />
                                    </div>
                                </div>

                                <Button type='submit' className='mt-3'>Registrar</Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default Register;