window.onload = main
var datosLibros = new Array();
var datosAutores = new Array();
var datosUsuarios = new Array();
var usuarioId;

function main(){
    document.getElementById("titol").addEventListener("change", flitro)
    getId()
    obtenerDatosAutores()
}

function flitro(){
    let titulo = document.getElementById("titol").value
    let filas = document.getElementById("files")

    if (titulo.length > 0) {
        fetch("https://serverred.es/api/libros/titulo/" + titulo)
        .then(response => response.json())
        .then(data => {
            datosLibros = data.resultado
            if(filas.childNodes.length > 0){
                do{
                    filas.lastChild.parentNode.removeChild(filas.lastChild);
                }while(filas.lastChild != null);
            }
            mostrarResultado()
        })
    }else{
        if(filas.childNodes.length > 0){
            do{
                filas.lastChild.parentNode.removeChild(filas.lastChild);
            }while(filas.lastChild != null);
        }
        obtenerDatosLibros();
    }
}

function getId(){
    usuarioId = localStorage.getItem("user-id")
    if (usuarioId == undefined){
        location.href = "reservarUsuari.html"
    }
}

function obtenerDatosAutores(){
    fetch("https://serverred.es/api/autores")
    .then(response => response.json())
    .then(data => {
        datosAutores = data.resultado
        obtenerDatosUsuarios()
    })
}

function obtenerDatosUsuarios(){
    fetch("https://serverred.es/api/usuarios")
    .then(response => response.json())
    .then(data => {
        datosUsuarios = data.resultado
        estableceTitulo();
        obtenerDatosLibros()
    })
}

function estableceTitulo(){
    let ele = document.getElementById("usuari")

    datosUsuarios.forEach(usuario => {
        if(usuario._id == usuarioId){
            ele.appendChild(document.createTextNode(usuario.nombre + " - " + usuario.email))
        }
    });
}

function obtenerDatosLibros(){
    fetch("https://serverred.es/api/libros")
    .then(response => response.json())
    .then(data => {
        datosLibros = data.resultado
        mostrarResultado()
    })
}

function mostrarResultado(){
    var filas = document.getElementById("files")

    datosLibros.forEach(libro => {
        
        let fila = document.createElement("tr")

        let check = document.createElement("input")
        check.setAttribute("type", "checkbox")
        check.setAttribute("id", libro._id)
        check.addEventListener("click", click)

        let titulo = document.createElement("th")
        titulo.appendChild(document.createTextNode(libro.titulo))
        
        let editorial = document.createElement("th")
        editorial.appendChild(document.createTextNode(libro.editorial))

        let precio = document.createElement("th")
        precio.appendChild(document.createTextNode(libro.precio))

        let autor = document.createElement("th")
        autor.appendChild(document.createTextNode(dameAutor(libro.autor)))

        fila.appendChild(check)
        fila.appendChild(titulo)
        fila.appendChild(editorial)
        fila.appendChild(precio)
        fila.appendChild(autor)
        
        filas.appendChild(fila)
    });
}

function click(){
    localStorage.setItem("libro-id", this.id)
    location.href = "reservarConfirmar.html"
}

function dameAutor(id) {
    var nombre = "No tiene Autor";
    datosAutores.forEach(autor => {
        if(autor._id == id){
            nombre = autor.nombre
        }
    });
    return nombre
}