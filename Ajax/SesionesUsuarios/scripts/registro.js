window.onload = main;

function main(){
    document.getElementById("enviar").addEventListener("click", validar, false)
}

function validar(e) {
    e.preventDefault();
    esborrarError();
    if (validarNombre() && validarCorreo() && validarClave()) {

        console.log("Valido");
        //altaLibro();
        return true;

    } else {
        e.preventDefault();
        return false;
    }
}


function validarNombre() {
    var element = document.getElementById("nom");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce un nombre");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nombre debe contener entre 6 y 255 letras, sin números.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarCorreo() {
    var element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce un email");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El email debe contener entre 6 y 1024 letras y ser válido.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarClave() {
    var element = document.getElementById("password");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce una contraseña");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La contraseña debe contener 6 dígitos como mínimo.");
        }
        //error(element);
        return false;
    }

    var elementc = document.getElementById("passwordc");
    if (!elementc.checkValidity()) {
        if (elementc.validity.valueMissing) {
            error2(elementc, "Repite la contraseña");
        }
        if (elementc.validity.patternMismatch) {
            error2(elementc, "La contraseña repetida debe contener 6 dígitos como mínimo.");
        }
        //error(element);
        return false;
    }

    if(element != elementc){
        error2(element, "Las conatraseñas no coinciden");
        return false;
    }
    return true;
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "form-control error";
    element.focus();
}


function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "form-control";
    }
    document.getElementById("enviar").className = "mt-2 btn btn-primary";
}