window.onload = main;

function main(){
    obtenerDatosApi();
}

function obtenerDatosApi (){

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState==4 && this.status==200){
            let respuesta = JSON.parse(this.responseText);
           
            var resultado = respuesta.resultado;
            
            cargarDatos(resultado);
        }
    }
    xmlhttp.open("GET","https://www.serverred.es/api/autores", true);
    xmlhttp.send();
}

function cargarDatos(resultado){
    
    console.log(resultado);
    var filas = document.getElementById("files");

    for (let i = 0; i < resultado.length; i++) {

        var fila = document.createElement("tr");

        var columna1 = document.createElement("td");
        var esborrarBtb = document.createElement("button");
        esborrarBtb.setAttribute("class", "btn btn-primary btn-lg my-3");
        esborrarBtb.setAttribute("id", resultado[i]._id);
        esborrarBtb.addEventListener("click", comprobar);
        esborrarBtb.innerHTML = "Esborrar";
        columna1.appendChild(esborrarBtb);
        fila.appendChild(columna1);

        var columna2 = document.createElement("td");
        var ModificarBtn = document.createElement("button");
        ModificarBtn.setAttribute("class", "btn btn-primary btn-lg my-3");
        ModificarBtn.setAttribute("id", resultado[i]._id);
        ModificarBtn.addEventListener("click", modidficarAutor)
        ModificarBtn.innerHTML = "Modificar";
        columna2.appendChild(ModificarBtn);
        fila.appendChild(columna2);
        
        var columna3 = document.createElement("td");
        var nombre = document.createElement("p");
        nombre.innerHTML = resultado[i].nombre;
        columna3.appendChild(nombre);
        fila.appendChild(columna3);

        var columna4 = document.createElement("td");
        var año = document.createElement("p");
        año.innerHTML = resultado[i].año_nacimiento;
        columna4.appendChild(año);
        fila.appendChild(columna4);
        
        filas.appendChild(fila);
    }

}

function modidficarAutor() {
    let id = this.id;
    console.log(this.id);

    localStorage.setItem("id-Autor", id);
    window.location.href = "modificarAutors.html";
}

function borrar(id) {
    fetch("https://serverred.es/api/autores/" + id, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {console.log(data); location.reload()})
        .catch(error => console.log(error));
}

function comprobar() {
    
    console.log(this.id);

    fetch('https://serverred.es/api/libros/')
        .then(response => response.json())
        .then(data => {
            var valido = true;
            data.resultado.forEach(element => {
                if (element.autor == this.id) {
                    valido = false;
                }
            })
            if (valido) {
                borrar(this.id);
            } else {
                alert("No es posible borrar un autor con libros");
            }
        })
        .catch(error => console.log(error));
}