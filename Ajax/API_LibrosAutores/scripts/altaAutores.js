window.onload = iniciar;

function iniciar() {

    document.getElementById("enviar").addEventListener("click", validar, false);
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

function validar(e) {
    e.preventDefault();
    esborrarError();
    if (validarNom() && validarNeix()) {

        altaAutor();
        return true;

    } else {
        e.preventDefault();
        return false;
    }
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