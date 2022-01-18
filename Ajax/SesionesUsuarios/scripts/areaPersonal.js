window.onload = main
var token;

function main(){
    document.getElementById("enviar").addEventListener("click", validar, false)
    document.getElementById("enviarAvatar").addEventListener("click", cambiaAvatar, false)
    comprobarToken()
    getDatosUsuario()
}

function comprobarToken(){
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if(tokenAux){
        token = tokenAux
    }else{
        alert("Debes iniciar sesion")
        window.location.href = "login.html"
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
        setNombre(data.data.user);
        setImg(data.data.user)
    })
    .catch(error => {
        error2(document.getElementById("nom"), error)
    })
}

function setNombre(user){
    let nomEle = document.getElementById("nom")
    nomEle.setAttribute("value", user.name)
}

function setImg(user) {

    let avatarAP = document.getElementById("avatarAP");
    let avatar = document.getElementById("avatar");

    avatarAP.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ user.avatar);
    avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ user.avatar);
}

function cambiaAvatar(e) {
    e.preventDefault()
    const formData = new FormData()
    const file = document.querySelector('input[type="file"]')

    formData.append("avatar", file.files[0])
    fetch(" https://userprofile.serverred.es/api/areapersonal/avatar",{
        method: "PUT",
        headers : {
            "auth-token": token
        },
        body: formData
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        // window.location.reload()
    })
    .catch(error=>{
        console.log(error)        
    })
}

/* ---------------------------------  VALIDACIÓN  ---------------------------------------------------- */

function validar(e) {
    e.preventDefault()
    esborrarError()
    if (validarNombre() && validarClaveA() && validarClave()) {

        if(comprovarContraseña()){
            console.log("Valido")
            return true
        }else{
            return false
        }
    } else {
        return false
    }
}

function comprovarContraseña(){

    var claves = crearClaves()
    console.log(claves);

    fetch("https://userprofile.serverred.es/api/areapersonal", {
        method: "PUT",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(claves)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error == null){
           alert("Contraseña cambiada con éxito")
        }else{
            error2(document.getElementById("nom"), data.error)
        }
    })
    .catch(error => {
        error2(document.getElementById("nom"), error)
    })
}

function crearClaves(){

    let nombreEle = document.getElementById("nom").value
    let passwdordaEle = document.getElementById("passworda").value
    let passwordcEle = document.getElementById("passwordc").value

    let claves = {
        name: nombreEle,
        password: passwdordaEle,
        newPassword: passwordcEle
    }

    return claves
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

function validarClaveA() {
    var element = document.getElementById("passworda")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce la contraseña actual")
        }
        if (element.validity.patternMismatch) {
            error2(element, "La contraseña debe contener 6 dígitos como mínimo.")
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
}