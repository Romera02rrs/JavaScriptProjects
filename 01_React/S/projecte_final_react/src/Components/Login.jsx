import React from "react";
import {
    Button,
} from 'react-bootstrap/';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
            .min(6, 'Too Short!')
            .max(1024, 'Too Long!')
            .email('Invalid email')
            .required('Required'),
    password: Yup.string()
            .min(6, 'Too Short!')
            .required('Required'),
});

function Login() {
    const login = (value) => {
        let user = {
            'email':value.email,
            'password':value.password
        }
        fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/login', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var token = data.data.token;
            localStorage.setItem("tk", JSON.stringify(token));
            window.location.href = "/";
        })
    }
    return (
        <div>
            <Formik initialValues={{ email: "", password: ""}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                    login(values);
                }}
            >
                {({ errors, touched }) => (
                    <div>
                        <div className="row mb-5">
                            <div className="col-lg-12">
                                <h1 className="mt-5">Login</h1>
                            </div>
                        </div>
                        <Form>
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
                                </div>
                                <Button type='submit' className='mt-3'>Login</Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default Login;