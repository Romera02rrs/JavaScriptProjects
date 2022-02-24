import Button from "react-bootstrap/Button"
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').max(20, 'Too Long!').required('Required')
})

const LoginForm = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <Formik initialValues={{ email: "", password: "" }}
                        validationSchema={SignupSchema}
                        onSubmit={values => { console.log(values); }}>
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3 row">
                                    <label htmlFor="email" className="col-sm-2 col-form-label">Correo electrónico</label>
                                    <div className="col-sm-10">
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            autoComplete="off"
                                            className="Form-control" />
                                        {errors.email && touched.email ?
                                            <div>{errors.email}</div> : null}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            className="Form-control" />
                                        {errors.password && touched.password ?
                                            <div>{errors.password}</div> : null}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4">Enviar</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default LoginForm