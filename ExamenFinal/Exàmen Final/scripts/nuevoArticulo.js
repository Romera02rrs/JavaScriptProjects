window.onload = main
var token
var datosCategorias

function main() {
    document.getElementById("crearArticulo").addEventListener("click", validar, false)
    comprobarToken()
    getDatosUsuario()
    estableceCategorias()
}

function estableceCategorias() {

    fetch("https://news.serverred.es/api/categories")
        .then(response => response.json())
        .then(data => {
            console.log(data.resultado)
            datosCategorias = data.resultado
            pintaCategorias()
        })
        .catch(error => console.log(error))
}

function pintaCategorias() {
    var sel = document.getElementById("categories")
    datosCategorias.forEach(element => {
        var option = document.createElement("option");                              // Creo opciones y las inserto en el select
        option.appendChild(document.createTextNode(element.name));
        option.setAttribute("value", element.name);
        sel.appendChild(option);
    });
}

function comprobarToken() {
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if (tokenAux) {
        token = tokenAux
    } else {
        alert("Debes iniciar sesion")
        window.location.href = "login.html"
    }
}

function getDatosUsuario() {
    fetch("https://news.serverred.es/api/areapersonal", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // funcion necesito los datos(data)
        })
        .catch(error => {
            console.log(error)
            //error2(document.getElementById("nom"), error)
        })
}

function nuevoArticulo() {

    

    var art = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value,
        author: document.getElementById("author").value,
        category: document.getElementById("categories").value,
        voteScore: 1
    }

    console.log(art);

    fetch("https://news.serverred.es/api/articles", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(art)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error == null) {
                alert("Creado correctamente")
            } else {
                alert("ERROR")
                //error2(document.getElementById("col3Ele"), data.error)
            }
        })
        .catch(error => {
            console.log(error)
        })
}

/* ---------------------------------  VALIDACIÓN  ---------------------------------------------------- */

function validar(e) {
    e.preventDefault()
    esborrarError()
    if (validarTitulo() && validarAutor() && validarBody()) {

        nuevoArticulo()
        return true

    } else {
        e.preventDefault()
        return false
    }
}

function validarTitulo() {
    var element = document.getElementById("title")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce un Titulo")
        } else {
            error2(element, "El titulo debe tener 5 dígitos como mínimo")
        }

        //error(element)
        return false
    }
    return true
}

function validarAutor() {
    var element = document.getElementById("author")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce una categoria")
        } else {
            error2(element, "La categoría debe tener 4 dígitos como mínimo")
        }

        //error(element)
        return false
    }
    return true
}

function validarBody() {
    var element = document.getElementById("body")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce un cuerpo de artículo")
        } else {
            error2(element, "El articulo debe tener 20 dígitos como mínimo")
        }

        //error(element)
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
    document.getElementById("crearArticulo").className = "mt-2 btn btn-primary"
    document.getElementById("missatgeError").innerHTML = ""
}