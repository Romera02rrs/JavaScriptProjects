window.onload = iniciar;

function iniciar() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function validarDNI() {
    var expReg = new RegExp(/^\d{8}[A-Za-z]{1}$/);
    var element = document.getElementById("DNI");
    if (expReg.test(element.value)) {
        return true;
    } else {
        error(element, "Error en el campo: DNI");
        return false;
    }
}

function validarTel() {
    var expReg = new RegExp(/^\d{3}\s?\d{3}\s?\d{3}$/);
    var element = document.getElementById("telefono");
    if (expReg.test(element.value)) {
        return true;
    } else {
        error(element, "Error en el campo: Teléfono");
        return false;
    }
}

function validarFecha() {
    var expReg = new RegExp(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/);
    var element = document.getElementById("fecha");
    if (expReg.test(element.value)) {
        return true;
    } else {
        error(element, "Error en el campo: Fecha");
        return false;
    }
}

function validarMatr() {
    var expReg = new RegExp(/^[0-9]{1,4}(?!.*(LL|CH))\s?[BCDFGHJKLMNPRSTVWXYZ]{3}$/);
    var element = document.getElementById("matricula");
    if (expReg.test(element.value)) {
        return true;
    } else {
        error(element, "Error en el campo: Matrícula");
        return false;
    }
}

function validarEmail() {
    var expReg = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
    var element = document.getElementById("correo");
    if (expReg.test(element.value)) {
        return true;
    } else {
        error(element, "Error en el campo: Correo Electrónico");
        return false;
    }
}

function validarURL() {
    var expReg = new RegExp(/^[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?$/);
    var element = document.getElementById("url");
    if (expReg.test(element.value)) {
        return true;
    } else {
        error(element, "Error en el campo: URL");
        return false;
    }
}

function validar(e) {

    borrarError();
    if (validarDNI() && validarTel() && validarFecha() && validarMatr() && validarEmail() && validarURL() && confirm("Confirme el envío del formulario")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function error(element, mensaje) {
    document.getElementById("errorMensaje").innerHTML = mensaje;
    element.className = "error";
    element.focus();
}

function borrarError() {
    var formulari = document = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}