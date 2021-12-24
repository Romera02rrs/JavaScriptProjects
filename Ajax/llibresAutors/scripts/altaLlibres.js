window.onload = inici;

function inici() {
    agafarAutors();
    document.getElementById("btnGravar").addEventListener("click", gravar, false);
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

function agafarAutors() {
    fetch("https://serverred.es/api/autores/", {
        method: "GET",
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            mostrarAutors(data);
        })
        .catch(error => console.log(error));
}

function mostrarAutors(data){
    let autor = document.getElementById("autor");

    data.resultado.forEach(element => {
        let option = document.createElement("option");
        let optionTxt = document.createTextNode(element.nombre);
        option.setAttribute("value", element._id);
        option.appendChild(optionTxt);
        autor.appendChild(option);
    });
}

function gravar(e) {
    esborrarError();
    e.preventDefault();
    if (validarTitol() && validarPreu() && confirm("¿Segur que vols crear a este llibre?")) {
        gravarAPI();
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

function gravarAPI() {
    var libro = {
        titulo: document.getElementById("titol").value,
        editorial: document.getElementById("editorial").value,
        precio: document.getElementById("preu").value,
        autor: document.getElementById("autor").value
    }
    fetch("https://serverred.es/api/libros/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(libro)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}