import { Formik, Form, Field } from "formik"
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(6, 'Demasiado corto!').max(255, 'Demasiado Largo!').required('Required'),
    email: Yup.string().email('Email inválido').min(6, 'Demasiado corto!').max(255, 'Demasiado Largo!').required('Required'),
    password: Yup.string().min(6, 'Demasiado corto!').max(20, 'Demasiado largo!').required('Required'),
    passwordConfirmation: Yup.string("").oneOf([Yup.ref('password'), null], 'No coincide').required('Required')
})

const RegForm = () => {

    let redireccionar = useNavigate()

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <Formik initialValues={{ name: "", email: "", password: "", passwordConfirmation: ""}} 
                            validationSchema={RegisterSchema}
                            onSubmit={values => {
                                registrar(values, redireccionar)
                            }}>
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="regFormName" className="form-label">Nombre</label>
                                    <div className="col">
                                        <Field type="text" id="regFormName" name="name" placeholder="Introducir nombre" autoComplete="off" className="form-control" />
                                        {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> : null}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="loginFormEmail" className="form-label">Correo electrónico</label>
                                    <div className="col">
                                        <Field type="email" id="loginFormEmail" name="email" placeholder="Introduce el email" autoComplete="off" className="form-control" />
                                        {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="loginFormPassword" className="form-label">Contraseña</label>
                                        <div className="col">
                                            <Field type="password" id="loginFormPassword" name="password" placeholder="Introduce la contraseña" className="form-control" />
                                            {errors.password && touched.password ? <div className="text-danger">{errors.password}</div> : null}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="loginFormPasswordConfirmation" className="form-label">Confirmar contraseña</label>
                                        <div className="col">
                                            <Field type="password" id="loginFormPasswordConfirmation" name="passwordConfirmation" placeholder="Repite la contraseña" className="form-control" />
                                            {errors.passwordConfirmation && touched.passwordConfirmation ? <div className="text-danger">{errors.passwordConfirmation}</div> : null}
                                        </div>
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

function registrar(values, redireccionar){

    const usuario = {
        name : values.name,
        email: values.email,
        password: values.password
    }

    fetch("https://api.tendaciclista.ccpegoilesvalls.es/api/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error == null){
            alert("Correcto")
            redireccionar("/login")
        }else{
            alert("ERROR")
            //error2(document.getElementById("nom"), data.error)
        }
    })
    .catch(error => {
        console.log(error)
    })
}

export default RegForm

// return (
//     <Form>
//         <Form.Group className="mb-3" controlId="formName">
//             <Form.Label>Nombre</Form.Label>
//             <Form.Control type="text" placeholder="Introducir nombre" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formEmail">
//             <Form.Label>Correo electrónico</Form.Label>
//             <Form.Control type="email" placeholder="introducir email" />
//         </Form.Group>

//         <Row className="mb-3">
//             <Form.Group as={Col} controlId="formPasswd">
//                 <Form.Label>Contraseña</Form.Label>
//                 <Form.Control type="password" placeholder="Contraseña" />
//             </Form.Group>

//             <Form.Group as={Col} controlId="formPasswdRepited">
//                 <Form.Label>Repetir contraseña</Form.Label>
//                 <Form.Control type="password" placeholder="Repetir Contraseña" />
//             </Form.Group>
//         </Row>

//         <Button variant="primary" type="submit">
//             Registrar
//         </Button>
//     </Form>
// )