import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').min(6, 'Demasiado corto!').max(255, 'Demasiado Largo!').required('Required'),
    password: Yup.string().min(6, 'Demasiado corto!').max(20, 'Demasiado largo!').required('Required')
})

const regForm = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <Formik initialValues={{ email: "", password: "" }} validationSchema={SignupSchema}>
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="regFormEmail" className="form-label">Correo electrónico</label>
                                    <div className="col-sm-10">
                                        <Field type="email" id="regFormEmail" name="email" placeholder="Introduce el email" autoComplete="off" className="form-control" />
                                        {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="regFormPassword" className="form-label">Contraseña</label>
                                    <div className="col-sm-10">
                                        <Field type="password" id="regFormPassword" name="password" placeholder="Introduce la contraseña" className="form-control" />
                                        {errors.password && touched.password ? <div className="text-danger">{errors.password}</div> : null}
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

export default regForm