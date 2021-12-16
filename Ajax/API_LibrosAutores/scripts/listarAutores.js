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
        esborrarBtb.setAttribute("id", resultado.id);
        esborrarBtb.innerHTML = "Esborrar";
        columna1.appendChild(esborrarBtb);
        fila.appendChild(columna1);

        var columna2 = document.createElement("td");
        var ModificarBtn = document.createElement("button");
        ModificarBtn.setAttribute("class", "btn btn-primary btn-lg my-3");
        ModificarBtn.setAttribute("id", resultado.id);
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