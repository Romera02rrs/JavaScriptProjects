window.onload = main;
var id;
var libro;
var datosAutores;

function main() {
    getId();
    getLibro();
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function getId(){
    id = localStorage.getItem("id-Libro");
    console.log(id);
}

function getLibro() {
    fetch("https://serverred.es/api/libros/" + id)
    .then(response => response.json())
    .then(obtenerDatosApiAutores())
    .then(data => creaLibro(data.resultado))
    .catch(error => console.log(error))
}

function obtenerDatosApiAutores() {
    fetch("https://www.serverred.es/api/autores")
    .then(response => response.json())
    .then(data => {
        datosAutores = data.resultado;
    })
}

function creaLibro(datos){

    libro = {
        titulo: datos.titulo,
        editorial: datos.editorial,
        precio: datos.precio,
        autor: datos.autor
    }

    setValues();
}

function setValues() {

    let titulo = document.getElementById("titol");
    let editorial = document.getElementById("editorial");
    let precio = document.getElementById("preu");
    var autor = document.getElementById("autor");
    setTimeout(function () {
        cargarNombresAutores(libro.autor);
    }, 100);

    titulo.setAttribute("value", libro.titulo);
    editorial.setAttribute("value", libro.editorial);
    precio.setAttribute("value", libro.precio);
}

function cargarNombresAutores(nombre) {
    var selectAutores = document.getElementById("autor");
    var div = document.getElementById("sel");
    datosAutores.forEach(element => {
        var opcion = document.createElement("option")
        var texto = document.createTextNode(element.nombre)
        
        opcion.appendChild(texto);

        if(nombre == element._id){
            opcion.setAttribute("selected", true)
        }

        opcion.setAttribute("value", element._id)
        selectAutores.appendChild(opcion);
    });
    div.replaceChildren(selectAutores, selectAutores);
}
   
function nuevoLibro(){

    let tituloEle = document.getElementById("titol").value;
    let editorialEle = document.getElementById("editorial").value;
    let precioEle = document.getElementById("preu").value;
    var autorEle = document.getElementById("autor").value;

    libro = {
        titulo: tituloEle,
        editorial: editorialEle,
        precio: precioEle,
        autor: autorEle
    }
}

function actualizaLibro() {
    fetch("https://serverred.es/api/libros/" + id, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(libro)
    })
    .then(response => response.json())
    .then(data => {console.log(data); window.location.href = "llistatllibres.html"})
    .catch(error => console.log(error));
}

/* ---------- VALIDACIÓN ---------- */

function validar(e) {
    e.preventDefault();
    esborrarError();
    if (validarTitulo() && validarEditorial() && validarPrecio()) {

        nuevoLibro();
        actualizaLibro();
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
            error2(element, "Deus d'introduïr un titol.");
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
            error2(element, "Deus d'introduïr una editorial.");
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
    document.getElementById("enviar").className = "btn btn-primary";
}