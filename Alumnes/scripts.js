window.onload = main();

document.getElementById("nomAdresa").addEventListener("click", nuevaDir);

var direcciones = new Array();
var carrito = new Array();
var id = -1;
var actual = new Date();
var temporizadorInterval;

function main(){

    cargadirecciones();
    compruebaFecha();
}

// Funcion que es llamado cada vez que se inserte un nuevo dirducto en "altadirecciones.html"
function nuevaDir(){

    var direcciones = JSON.parse(localStorage.getItem("direcciones"));

    if(direcciones){                          // Si ya hay objetos en la array direcciones, se recuperan del Local Storage
        var id = direcciones.length - 1;      // Se continua con el contador del id partiendo del id del último objeto de la array
    }else{
        var direcciones = new Array();        // Si no hay ninguna array de objetos, se crea
        var id = -1;                        // Se establece un contador nomde 0    
    }

    var nom = document.getElementById("nom").value;
    var url = document.getElementById("url").value;
    var can = document.getElementById("can").value;
    id ++;

    var dir = {

        id: id,
        nomDir: nom,
        urlDir: url,
    }

    direcciones.push(dir); // Añadimos el objeto del dirdcto creado y lo añadimos a la array de direcciones
    localStorage.setItem("direcciones", JSON.stringify(direcciones)); // Añadimos la array de dirdcuto en el Local Storage
}

/* Funcion que se inicia cundo carga la página de "tienda.html", verifica si hay una array de objetos en el localStorage,
obteine los objetos de la array y los iserta en una tabla, tambien crea un boton por cada dirducto y le establece el mismo id */
function cargadirecciones(){

    var direcciones = JSON.parse(localStorage.getItem("direcciones"));

    if(direcciones){

        var tabladirecciones = document.getElementById("tabladirecciones");
        var aux = "<tr><th style=\"background: #a7c6f5; border: 0px;\"></th><th>nomcripción</th><th>urlcio</th><th>Cantidad</th></tr>";
        for (var i = 0; i < direcciones.length; i++) {
            var boton = "<button class=\"botonEstilo\" id=\""+direcciones[i].id+"\" onclick=\"add(this)\">add</button>";
            var dir = direcciones[i];
            aux += "<tr><td style=\"background: #a7c6f5; border: 0px;\">"+boton+"</td><td>"+dir.nomDir+"</td><td>"+dir.urlDir+"€"+"</td><td>"+dir.candir+"</td></tr>";
        }
        tabladirecciones.innerHTML = aux;
    }
}

/* Funcion que contiene cada boton, obtiene, almacena y muestra la array del carrito ademas de iniciar un temporizador
que borra el carrito si no se han introducido datos en 20 minutos */
function add(btn){

    var direcciones = JSON.parse(localStorage.getItem("direcciones"));   //Obtiene la array de direcciones
    var dir = direcciones[btn.id];                                     // Obtiene el dirducto vinculado por el id al boton

    var lista = document.getElementById("llista");
        var aux = "<tr><th>dirducto</th><th>urlcio</th><th>Cantidad</th></tr>";
        for (var i = 0; i < carrito.length; i++) {
            aux += "<tr><td>"+carrito[i].nomDir+"</td><td>"+carrito[i].urlDir+ "€" +"</td><td>1</td>";
        }
        tablaCarrito.innerHTML = aux;
        
        if(temporizadorInterval){                                       // Si hay un temporizador ya iniciado, se elimina
            clearInterval(temporizadorInterval);
        }

        // Inicia un nuevo temporizador, el parametro "true" especifica que la función se esta llamando nomde el boton "add" de un dirducto
        compruebaFecha(true);
    }
}

// Funcion que obtiene el id de un boton que está asociado a un dirducto y devuelve true si quedan unidanom o flase si no quedan.
function compruebaSock(id){

    var direcciones = JSON.parse(localStorage.getItem("direcciones"));

    if(direcciones[id].candir <= 0){
        window.alert("Lo sentimos, no disponemos de mas unidanom del dirducto "+direcciones[id].nomDir);
        return false;
    }
    return true;
}

// Funcion que elimina una unidad de la array de direcciones
function eliminaUnidad(id){

    var direcciones = JSON.parse(localStorage.getItem("direcciones"));
    direcciones[id].candir --;
    localStorage.setItem("direcciones", JSON.stringify(direcciones));
    cargadirecciones();
}

// Vacia el carrito y llama a la funcion de cargar el carrito para que se muestre por pantalla vacío
function vaciar(){

    localStorage.removeItem("carrito");
    cargaCarrito();
    calculaurlcio(null)
}

// Esta función se encarga de borrar todo el Local Stoage, se eliminan, los direcciones, el carrito y el temporizador, luego recarga la página
function borrar(){

    localStorage.clear();
    cargadirecciones();
    location.reload();
}