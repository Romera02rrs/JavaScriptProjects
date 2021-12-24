
window.onload = inici;

function inici() {
    obtenirDades();
    document.getElementById("btnGravar").addEventListener("click", gravar, false);
}

function tornar() {
    window.location = "llistatAutors.html";
}

function obtenirDades() {
    if (JSON.parse(localStorage.getItem("idAutor")) != null) {
        id = JSON.parse(localStorage.getItem("idAutor"));
    }
    fetch("https://serverred.es/api/autores/" + id, {
        method: "GET",
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            var nom = document.getElementById("nom");
            nom.setAttribute("value", data.resultado.nombre);
            var anynaix = document.getElementById("anynaix");
            anynaix.setAttribute("value", data.resultado.año_nacimiento)
        })
        .catch(error => console.log(error));
}

function validarNom() {
    esborrarError();
    var element = document.getElementById("nom");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El nom es requerit.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El titol ha de tindre mes de 3 caracters i no pot contenir caracters especials.")
        }
        return false;
    }
    borrarError();
    return true;
}

function validarAny() {
    esborrarError();
    var element = document.getElementById("anynaix");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El any es requerit.");
        }
        if (element.validity.rangeOverflow) {
            error2(element, "L'any no pot ser superior de 2000.");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "L'any no pot ser menor de 0.");
        }
        return false;
    }
    borrarError();
    return true;
}

function gravar(e) {
    e.preventDefault();
    if (validarNom() && validarAny() && confirm("¿Segur que vols editar a este autor?")) {
        editarAutor();
        setTimeout(function () {
            tornar();
        }, 50);
        return true;
    } else {
        return false;
    }
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "form-control border-danger";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length - 1; i++) {
        formulari.elements[i].className = "form-control";
    }
}

function borrarError() {
    document.getElementById("missatgeError").innerHTML = "";
}

function editarAutor() {
    if (JSON.parse(localStorage.getItem("idAutor")) != null) {
        id = JSON.parse(localStorage.getItem("idAutor"));
    }
    autor = {
        nombre: document.getElementById("nom").value,
        año_nacimiento: document.getElementById("anynaix").value
    }
    fetch("https://serverred.es/api/autores/" + id, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(autor)

    })

        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}
