window.onload = main;
var listaAutores;

function main(){
    obtenerDatosApiAutores();
}

function obtenerDatosApiAutores(){

    fetch("https://www.serverred.es/api/autores")
    .then(response => response.json())
    .then(data => {
        listaAutores = data.resultado;
        console.log(listaAutores);
        obtenerDatosApi();
    })
    .catch(error => console.log(error));
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
    xmlhttp.open("GET","https://www.serverred.es/api/libros", true);
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
        esborrarBtb.addEventListener("click", borrar);
        esborrarBtb.innerHTML = "Esborrar";
        columna1.appendChild(esborrarBtb);
        fila.appendChild(columna1);

        var columna2 = document.createElement("td");
        var ModificarBtn = document.createElement("button");
        ModificarBtn.setAttribute("class", "btn btn-primary btn-lg my-3");
        ModificarBtn.setAttribute("id", resultado[i]._id);
        ModificarBtn.addEventListener("click", modificarLibro);
        ModificarBtn.innerHTML = "Modificar";
        columna2.appendChild(ModificarBtn);
        fila.appendChild(columna2);
        
        var columna3 = document.createElement("td");
        var titulo = document.createElement("p");
        titulo.innerHTML = resultado[i].titulo;
        columna3.appendChild(titulo);
        fila.appendChild(columna3);

        var columna4 = document.createElement("td");
        var editorial = document.createElement("p");
        editorial.innerHTML = resultado[i].editorial;
        columna4.appendChild(editorial);
        fila.appendChild(columna4);

        var columna5 = document.createElement("td");
        var precio = document.createElement("p");
        precio.innerHTML = resultado[i].precio;
        columna5.appendChild(precio);
        fila.appendChild(columna5);

        var columna6 = document.createElement("td");
        var autor = document.createElement("p");
        autor.innerHTML = getName(resultado[i].autor);
        columna6.appendChild(autor);
        fila.appendChild(columna6);
        
        filas.appendChild(fila);
    }
}

function modificarLibro() {
    let id = this.id;
    console.log(this.id);

    localStorage.setItem("id-Libro", id);
    window.location.href = "modificarLlibres.html";
}

function getName(id){
    
    var nombre = "No tiene autor";
    listaAutores.forEach(autor => {
        if(autor._id == id){
            nombre = autor.nombre;
        }
    });
    return nombre;
}

function borrar() {
    console.log(this.id);
    fetch("https://www.serverred.es/api/libros/" + this.id, {method: "DELETE"});
}