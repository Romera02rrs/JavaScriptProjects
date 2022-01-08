window.onload = main
var datosUsuarios = new Array();
var datosLibros = new Array();
var usuarioId
var libroId
var fechaPrestamo

function main(){
    getId()
    obtenerDatosUsuarios()
}

function getId(){
    usuarioId = localStorage.getItem("user-id")
    libroId = localStorage.getItem("libro-id")
}

function obtenerDatosUsuarios(){
    fetch("https://serverred.es/api/usuarios")
    .then(response => response.json())
    .then(data => {
        datosUsuarios = data.resultado
        obtenerDatosLibros()
    })
}

function obtenerDatosLibros(){
    fetch("https://serverred.es/api/libros")
    .then(response => response.json())
    .then(data => {
        datosLibros = data.resultado
        estableceDatos();
        document.getElementById("btnReservar").addEventListener("click", click, false)
    })
}

function estableceDatos(){
    var usuEle = document.getElementById("usuari")
    var libEle = document.getElementById("llibre")

    datosUsuarios.forEach(usuario => {
        if(usuario._id == usuarioId){
            usuEle.setAttribute("value", usuario.nombre)
        }
    });
    datosLibros.forEach(libro => {
        if(libro._id == libroId){
            libEle.setAttribute("value", libro.titulo)
        }
    });
}

function click(e) {
    e.preventDefault()
    esborrarError();

    if(compruebaFecha()){
        altaReserva()
    }else{
        error2(document.getElementById("dataPrestec"), "Fecha Inválida")
    }
}

function compruebaFecha(){
    var prestamo = document.getElementById("dataPrestec").value

    var valido = false

    fechaPrestamo = new Date(prestamo)
    var fechaActual = new Date()

    if(fechaPrestamo > fechaActual || isNaN(fechaPrestamo.getTime())) {
        valido = false
    }else{
        valido = true
    }

    return valido
}

function altaReserva() {

    var reserva = creaReserva();
    console.log(reserva);

    fetch("https://www.serverred.es/api/reservas", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // window.location.href = "llistatLlibres.html";
    })
    .catch(error => console.log(error));
}

function creaReserva(){

    return {
        usuario: usuarioId,
        libroId: libroId,
        fecha: new Date(),
        fechaDevolucion: fechaPrestamo
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
    document.getElementById("missatgeError").innerHTML = "";
    document.getElementById("btnReservar").className = "btn btn-primary";
}