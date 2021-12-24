window.onload = main;
var datosAutores;

function main() {
    obtenerDatosApiAutores();
}

function obtenerDatosApiAutores() {
    fetch("https://www.serverred.es/api/autores")
    .then(response => response.json())
    .then(data => {
        datosAutores = data.resultado;
        cargarNombresAutores();
        document.getElementById("btnGravar").addEventListener("click", validar, false);
    })
}

function cargarNombresAutores() {
    var selectAutores = document.getElementById("autor");
    var div = document.getElementById("sel");
    datosAutores.forEach(element => {
        var opcion = document.createElement("option")
        var texto = document.createTextNode(element.nombre)
        
        opcion.appendChild(texto);
        selectAutores.appendChild(opcion);
    });
    div.replaceChildren(selectAutores, selectAutores);
}

/* ----------- VALIDACIÓN ---------- */

function validar(e) {
    e.preventDefault();
    esborrarError();
    if (validarTitulo() && validarEditorial() && validarPrecio()) {

        altaLibro();
        return true;

    } else {
        e.preventDefault();
        return false;
    }
}


function validarTitulo() {
    var element = document.getElementById("titol");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduïr un nom.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nom ha de tindre entre mas de 2 letras y sin numeros.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarEditorial() {
    var element = document.getElementById("editorial");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduïr un nom.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nom ha de tindre letras y sin numeros.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarPrecio() {
    var element = document.getElementById("preu");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduïr una preu.");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "La data mínima ha de ser superior a 0.");
        }
        //error(element);
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
    document.getElementById("btnGravar").className = "btn btn-primary";
}