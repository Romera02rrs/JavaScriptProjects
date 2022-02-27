import { Formik, Form, Field, validateYupSchema } from "formik"
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { Link, Redirect } from "react-router-dom"

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').min(6, 'Demasiado corto!').max(255, 'Demasiado Largo!').required('Required'),
    password: Yup.string().min(6, 'Demasiado corto!').max(20, 'Demasiado largo!').required('Required')
})

const LoginForm = () => {

    const redirecciones = useNavigate()

    return (
        <div className="container">
            <p className="text-danger" id="errApi"></p>
            <div className="row">
                <div className="col-lg-12">
                    <Formik initialValues={{ email: "", password: "" }} validationSchema={SignupSchema} onSubmit={values => {loguear(values, redirecciones)}}>
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

function loguear(values, redirecciones){


    fetch("https://api.tendaciclista.ccpegoilesvalls.es/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error == null){
            localStorage.setItem("token", JSON.stringify(data.data.token))
            redirecciones("/")
        }else{
            document.getElementById("errApi").innerHTML = data.error
        }
    })
    .catch(error => {
        console.log(error);
    })
}

export default LoginForm