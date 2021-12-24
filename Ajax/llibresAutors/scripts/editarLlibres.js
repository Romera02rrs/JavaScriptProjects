window.onload = inici;

function inici() {
    obtenirDades();
    document.getElementById("btnGravar").addEventListener("click", gravar, false);
}

function obtenirDades() {
    if (JSON.parse(localStorage.getItem("idLlibre")) != null) {
        id = JSON.parse(localStorage.getItem("idLlibre"));
    }
    fetch("https://serverred.es/api/libros/" + id, {
        method: "GET",
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            var titol = document.getElementById("titol");
            titol.setAttribute("value", data.resultado.titulo);
            var editorial = document.getElementById("editorial");
            editorial.setAttribute("value", data.resultado.editorial)
            var preu = document.getElementById("preu");
            preu.setAttribute("value", data.resultado.precio)
            fetch("https://serverred.es/api/autores/"+data.resultado.autor, {
                method: "GET",
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    mostrarAutors(data);
                })
                .catch(error => console.log(error));

        })
        .catch(error => console.log(error));
}

function validarTitol() {
    esborrarError();
    var element = document.getElementById("titol");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El titol es requerit.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El titol ha de tindre mes de 3 caracters i no pot contenir caracters especials.")
        }
        return false;
    }
    borrarError();
    return true;
}

function validarPreu() {
    esborrarError();
    var element = document.getElementById("preu");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El preu es requerit.");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "El preu no pot ser menor de 0.");
        }
        return false;
    }
    borrarError();
    return true;
}

function mostrarAutors(data) {
    console.log(data);
    var autor = document.getElementById("autor");
    var option = document.createElement("option");
    var optionTxt = document.createTextNode(data.resultado.nombre);
    option.setAttribute("value", data.resultado._id);
    option.appendChild(optionTxt);
    autor.appendChild(option);
}

function gravar(e) {
    esborrarError();
    e.preventDefault();
    if (validarTitol() && validarPreu() && confirm("¿Segur que vols crear a este llibre?")) {
        editarLlibre();
        setTimeout(function () {
            tornar();
        }, 50);
        return true;
    } else {
        return false;
    }
}

function tornar() {
    document.location.href = "llistatLlibres.html";
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

function editarLlibre() {
    if (JSON.parse(localStorage.getItem("idLlibre")) != null) {
        id = JSON.parse(localStorage.getItem("idLlibre"));
    }
    var libro = {
        titulo: document.getElementById("titol").value,
        editorial: document.getElementById("editorial").value,
        precio: document.getElementById("preu").value,
        autor: document.getElementById("autor").value
    }
    fetch('https://serverred.es/api/libros/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(libro)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}