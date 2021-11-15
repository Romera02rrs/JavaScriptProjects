window.onload = main;
var direcciones = new Array();
var id = -1;

function main(){
    
    document.getElementById("crearAdresa").addEventListener("click", crearDireccion);;
    cargaDirecciones();
}

function setId(){

    var id = -1;
    
    var direcciones = JSON.parse(localStorage.getItem("direcciones"));

    if (direcciones){
        direcciones.forEach(element => {
            id ++;
            element.id = id;
        });    
    }else{
        direcciones = new Array();
    }

    localStorage.setItem("direcciones", JSON.stringify(direcciones)); 

    return direcciones;
}

function crearDireccion(){

    var direcciones = setId();

    var nombreInput = document.getElementById("nomAdresa");
    var urlInput = document.getElementById("urlAdresa");
    id ++;

    var direccion = {

        id: id,
        nombre: nombreInput.value,
        url: urlInput.value
    }

    direcciones.push(direccion);
    localStorage.setItem("direcciones", JSON.stringify(direcciones));
    cargaDirecciones();
}

function borrarDireccion(input){

    var direcciones = JSON.parse(localStorage.getItem("direcciones"));

    var lista = document.getElementById("llista");

    var lis = lista.childNodes;

    var direccion = lis[input.id];
    direccion.parentNode.removeChild(direccion);
    
    direcciones.splice(input.id, 1);

    console.table(direcciones);
    localStorage.setItem("direcciones", JSON.stringify(direcciones));

    cargaDirecciones();
}

function cargaDirecciones(){

    var lista = document.getElementById("llista");
    lista.replaceChildren();
    var direcciones = setId();

    if(direcciones){
        var aux = "";
        for (var i = 0; i < direcciones.length; i++) {
            var direccion = direcciones[i];
            aux = "<li id='"+direccion.id+"'><input type=\"checkbox\" id=\""+direccion.id+"\" onclick=\"borrarDireccion(this)\" name=\""+direccion.nombre+"\" url=\""+direccion.url+"\">"+direccion.nombre+"</li>";
            
            var texto = document.createTextNode(direccion.nombre);

            var input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", direccion.id);
            input.setAttribute("onclick", "borrarDireccion(this)");
            input.setAttribute("name", direccion.nombre);
            input.setAttribute("url", direccion.url);

            console.log("prueba");
            
            var li = document.createElement("li");
            li.setAttribute("id", direccion.id);
            li.appendChild(input);
            lista.appendChild(li);
            li.appendChild(texto);
        }
    }
}
    
// Rubén Romera
