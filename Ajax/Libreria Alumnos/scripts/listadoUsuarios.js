window.onload = main
var datosUsuarios = new Array();


function main() {
    obtenerDatosUsuarios()
}

function obtenerDatosUsuarios(){
    fetch("https://serverred.es/api/usuarios")
    .then(response => response.json())
    .then(data => {
        datosUsuarios = data.resultado
        mostrarResultado()
    })
}

function mostrarResultado() {
    console.log(datosUsuarios);
    var filas = document.getElementById("files")

    datosUsuarios.forEach(usuario => {
        
        let fila = document.createElement("tr")

        let check = document.createElement("input")
        check.setAttribute("type", "checkbox")
        check.addEventListener("click", click)
        check.setAttribute("id", usuario._id)

        let nombre = document.createElement("th")
        nombre.appendChild(document.createTextNode(usuario.nombre))
        
        let tel = document.createElement("th")
        tel.appendChild(document.createTextNode(usuario.telefono))

        let correo = document.createElement("th")
        correo.appendChild(document.createTextNode(usuario.email))

        let direccion = document.createElement("th")
        direccion.appendChild(document.createTextNode(usuario.direccion))

        fila.appendChild(check)
        fila.appendChild(nombre)
        fila.appendChild(tel)
        fila.appendChild(correo)
        fila.appendChild(direccion)
        
        filas.appendChild(fila)
    });

    function click(){
        localStorage.setItem("user-id", this.id)
        location.href = "reservarLlibre.html"
    }
}