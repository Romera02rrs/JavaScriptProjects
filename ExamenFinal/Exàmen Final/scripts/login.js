window.onload = main

function main(){
    comprobarToken()
    document.getElementById("enviar").addEventListener("click", validar, false)
}

function comprobarToken(){
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if(tokenAux){
        alert("Ya has iniciado sesión")
        window.location.href = "index.html"
    }
}

function registrarusuario(){
    let usuario = creaUsuario()
    fetch("https://news.serverred.es/api/login", {
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
            setToken(data.data.token);
            window.location.href = "areaPersonal.html"
        }else{
            error2(document.getElementById("email"), data.error)
        }
    })
    .catch(error => {
        error2(document.getElementById("email"), error)
    })
}

function creaUsuario(){
    let usuario = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }
    return usuario
}

function setToken(token){
    console.log(token);
    localStorage.setItem("token", JSON.stringify(token))
}

/* ---------------------------------  VALIDACIÓN  ---------------------------------------------------- */

function validar(e) {
    e.preventDefault()
    esborrarError()
    if (validarCorreo() && validarClave()) {

        registrarusuario()
        return true

    } else {
        e.preventDefault()
        return false
    }
}

function validarCorreo() {
    var element = document.getElementById("email")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce un email")
        }
        if (element.validity.patternMismatch) {
            error2(element, "El email debe contener entre 6 y 1024 letras y ser válido.")
        }
        //error(element)
        return false
    }
    return true
}

function validarClave() {
    var element = document.getElementById("password")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce una contraseña")
        }
        if (element.validity.patternMismatch) {
            error2(element, "La contraseña debe contener 6 dígitos como mínimo.")
        }
        //error(element)
        return false
    }
    return true
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge
    element.className = "form-control error"
    element.focus()
}


function esborrarError() {
    var formulari = document.forms[0]
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "form-control"
    }
    document.getElementById("enviar").className = "mt-2 btn btn-primary"
    document.getElementById("missatgeError").innerHTML = ""
}