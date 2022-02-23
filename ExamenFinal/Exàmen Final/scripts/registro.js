window.onload = main

function main(){
    document.getElementById("enviar").addEventListener("click", validar, false)
    comprobarToken()
}

function comprobarToken(){
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if(tokenAux){
        token = tokenAux
        getDatosUsuario()
    }
}

function getDatosUsuario(){
    fetch("https://userprofile.serverred.es/api/areapersonal", {
        method: "GET",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Accept' : 'application/json',
            "auth-token": token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setImg(data.data.user)
    })
    .catch(error => {
       console.error(error);
    })
}

function setImg(user) {
    
    let avatar = document.getElementById("avatar");

    avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ user.avatar);
}

function registrarusuario(){
    let usuario = creaUsuario()
    fetch("https://news.serverred.es/api/register", {
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
            alert("Usuario creado correctamente")
        }else{
            error2(document.getElementById("nom"), data.error)
        }
        // window.location.href = "llistatLlibres.html"
    })
    .catch(error => {
        console.log(error)
    })
}

function creaUsuario(){
    let usuario = {
        name: document.getElementById("nom").value,
        email: document.getElementById("email").value,
        password: document.getElementById("passwordc").value,
    }
    return usuario
}

/* ---------------------------------  VALIDACIÓN  ---------------------------------------------------- */

function validar(e) {
    e.preventDefault()
    esborrarError()
    if (validarNombre() && validarCorreo() && validarClave()) {

        console.log("Valido")
        registrarusuario()
        return true

    } else {
        e.preventDefault()
        return false
    }
}


function validarNombre() {
    var element = document.getElementById("nom")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce un nombre")
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nombre debe contener entre 6 y 255 letras, sin números.")
        }
        //error(element)
        return false
    }
    return true
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

    var elementc = document.getElementById("passwordc")
    if (!elementc.checkValidity()) {
        if (elementc.validity.valueMissing) {
            error2(elementc, "Repite la contraseña")
        }
        if (elementc.validity.patternMismatch) {
            error2(elementc, "La contraseña repetida debe contener 6 dígitos como mínimo.")
        }
        //error(element)
        return false
    }

    if(element.value != elementc.value){
        error2(element, "Las conatraseñas no coinciden")
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