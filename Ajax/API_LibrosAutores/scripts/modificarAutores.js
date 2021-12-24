
window.onload = main;
var id;
var autor;

function main() {
    getId();
    getAutor();
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function getId(){
    id = localStorage.getItem("id-Autor");
    console.log(id);
}

function getAutor() {
    fetch("https://serverred.es/api/autores/" + id)
    .then(response => response.json())
    .then(data => creaAutor(data.resultado))
    .catch(error => console.log(error))
}

function setValues() {
    let nombre = document.getElementById("nombre");
    let naciemiento = document.getElementById("nacimiento");

    nombre.setAttribute("value", autor.nombre);
    naciemiento.setAttribute("value", autor.año_nacimiento);
}

function creaAutor(datos){

    autor = {
        nombre: datos.nombre,
        año_nacimiento: datos.año_nacimiento
    }

    setValues();
}

function actualizaAutor() {
    fetch("https://serverred.es/api/autores/" + id, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(autor)
    })
    .then(response => response.json())
    .then(data => {console.log(data); window.location.href = "llistatAutors.html"})
    .catch(error => console.log(error));
}

function nuevoAutor(){

    let nombreEle = document.getElementById("nombre").value;
    let nacimientoEle = document.getElementById("nacimiento").value;

    autor = {
        nombre: nombreEle,
        año_nacimiento: nacimientoEle
    }
}

/* ---------- VALIDACIÓN ---------- */

function validar(e) {
    e.preventDefault();
    esborrarError();
    if (validarNom() && validarNeix()) {

        nuevoAutor();
        actualizaAutor();
        return true;

    } else {
        e.preventDefault();
        return false;
    }
}

function validarNom() {
    var element = document.getElementById("nombre");
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


function validarNeix() {
    var element = document.getElementById("nacimiento");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus d'introduïr una data.");
        }
        if (element.validity.rangeOverflow) {
            error2(element, "La data màxima ha de ser inferior a 2000.");
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
    document.getElementById("enviar").className = "btn btn-primary";
}