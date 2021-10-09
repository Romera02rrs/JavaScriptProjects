var productos = new Array();
var carrito = new Array();
var id = -1;
var actual = new Date();
var temporizadorInterval;

// Funcion que es llamado cada vez que se inserte un nuevo producto en "altaProductos.html"
function nuevoProducto(){

    var productos = JSON.parse(localStorage.getItem("productos"));

    if(productos){                          // Si ya hay objetos en la array productos, se recuperan del Local Storage
        var id = productos.length - 1;      // Se continua con el contador del id partiendo del id del último objeto de la array
    }else{
        var productos = new Array();        // Si no hay ninguna array de objetos, se crea
        var id = -1;                        // Se establece un contador desde 0    
    }

    var des = document.getElementById("des").value;
    var pre = document.getElementById("pre").value;
    var can = document.getElementById("can").value;
    id ++;

    var pro = {

        id: id,
        desPro: des,
        prePro: pre,
        canPro: can
    }

    productos.push(pro); // Añadimos el objeto del prodcto creado y lo añadimos a la array de productos
    localStorage.setItem("productos", JSON.stringify(productos)); // Añadimos la array de prodcuto en el Local Storage
}

/* Funcion que se inicia cundo carga la página de "tienda.html", verifica si hay una array de objetos en el localStorage,
obteine los objetos de la array y los iserta en una tabla, tambien crea un boton por cada producto y le establece el mismo id */
function cargaProductos(){

    var productos = JSON.parse(localStorage.getItem("productos"));

    if(productos){

        var tablaProductos = document.getElementById("tablaProductos");
        var aux = "<tr><th style=\"background: #a7c6f5; border: 0px;\"></th><th>Descripción</th><th>Precio</th><th>Cantidad</th></tr>";
        for (var i = 0; i < productos.length; i++) {
            var boton = "<button class=\"botonEstilo\" id=\""+productos[i].id+"\" onclick=\"add(this)\">add</button>";
            var pro = productos[i];
            aux += "<tr><td style=\"background: #a7c6f5; border: 0px;\">"+boton+"</td><td>"+pro.desPro+"</td><td>"+pro.prePro+"€"+"</td><td>"+pro.canPro+"</td></tr>";
        }
        tablaProductos.innerHTML = aux;
    }
}

/* Funcion que se inicia cundo carga la página de "tienda.html", verifica si existe la array "carrito" en el localStorage,
obteine los objetos de la array y los iserta en una tabla */
function cargaCarrito(){

    var tablaCarrito = document.getElementById("tablaCarrito");
    var carrito = JSON.parse(localStorage.getItem("carrito"));

    if(carrito){
        if(carrito.length > 0){

            var aux = "<tr><th>Producto</th><th>Precio</th><th>Cantidad</th></tr>";
            for (var i = 0; i < carrito.length; i++) {
                aux += "<tr><td>"+carrito[i].desPro+"</td><td>"+carrito[i].prePro+ "€" +"</td><td>1</td></tr>";
            }
            tablaCarrito.innerHTML = aux;
        }
    }else{
        var aux = "<tr><th>Producto</th><th>Precio</th><th>Cantidad</th></tr>";
        tablaCarrito.innerHTML = aux;
    }
}

/* Funcion que contiene cada boton, obtiene, almacena y muestra la array del carrito ademas de iniciar un temporizador
que borra el carrito si no se han introducido datos en 20 minutos */
function add(btn){

    var productos = JSON.parse(localStorage.getItem("productos"));   //Obtiene la array de productos
    var pro = productos[btn.id];                                     // Obtiene el producto vinculado por el id al boton
    var carrito = JSON.parse(localStorage.getItem("carrito"));       // Obtine la array del carrito

    // En el caso de que no haya una array de carrito existente en el LocalStorage, lo creamos.
    if (carrito == null){
        var carrito = new Array();
    } 
    if(compruebaSock(btn.id)){                                       // Comprueba que hayan unidades disponibles, si no quedan no sigue la ejecución del código.

        carrito.push(pro);                                           // Inserta el producto a la array del carrito
        eliminaUnidad(btn.id);                                       // Eliminar unidad de la array de productos
        localStorage.setItem("carrito", JSON.stringify(carrito));    // Inserta la array del carrito al LocalStorage
        calculaPrecio();                                             // Calcula el precio de todos los productos del carrito
        var tablaCarrito = document.getElementById("tablaCarrito");
        var aux = "<tr><th>Producto</th><th>Precio</th><th>Cantidad</th></tr>";
        for (var i = 0; i < carrito.length; i++) {
            aux += "<tr><td>"+carrito[i].desPro+"</td><td>"+carrito[i].prePro+ "€" +"</td><td>1</td>";
        }
        tablaCarrito.innerHTML = aux;
        
        if(temporizadorInterval){                                       // Si hay un temporizador ya iniciado, se elimina
            clearInterval(temporizadorInterval);
        }

        // Inicia un nuevo temporizador, el parametro "true" especifica que la función se esta llamando desde el boton "add" de un producto
        compruebaFecha(true);
    }
}

// Funcion que obtiene el id de un boton que está asociado a un producto y devuelve true si quedan unidades o flase si no quedan.
function compruebaSock(id){

    var productos = JSON.parse(localStorage.getItem("productos"));

    if(productos[id].canPro <= 0){
        window.alert("Lo sentimos, no disponemos de mas unidades del producto "+productos[id].desPro);
        return false;
    }
    return true;
}

// Funcion que elimina una unidad de la array de productos
function eliminaUnidad(id){

    var productos = JSON.parse(localStorage.getItem("productos"));
    productos[id].canPro --;
    localStorage.setItem("productos", JSON.stringify(productos));
    cargaProductos();
}

// Calcula el precio de cada producto insertado en la array del carrito
function calculaPrecio(){

    var carrito = JSON.parse(localStorage.getItem("carrito"));

    var precioHTML = document.getElementById("precioFinal");
    var precio = 0.0;

    if(carrito == null){
        precioHTML.innerText = "Precio = 0€";
        return;
    }
    for(var i = 0; i < carrito.length; i++){
        precio += parseFloat(carrito[i].prePro, 10);
    }

    precioHTML.innerText = "Precio = " + precio.toFixed(2) + "€";
}

// Vacia el carrito y llama a la funcion de cargar el carrito para que se muestre por pantalla vacío
function vaciar(){

    localStorage.removeItem("carrito");
    cargaCarrito();
    calculaPrecio(null)
}

// Esta función se encarga de borrar todo el Local Stoage, se eliminan, los productos, el carrito y el temporizador, luego recarga la página
function borrar(){

    localStorage.clear();
    cargaProductos();
    location.reload();
}

/* Esta función se encarga de establecer un temporizador, puede llamarse desde los botones "add" o cuando se carga la página por primera vez
de ahí depende al parametro que recoge "addPresionado" */
function compruebaFecha(addPresionado){

    const tempsEl = document.getElementById("tiempo");
    const infoTiempoEl = document.getElementById("infoTiempo");

    var fechaSumada = JSON.parse(localStorage.getItem("fecha"));

    // Si es llamado desde el boton "add" el temporizador se reinicia a 20 minutos
    if(addPresionado){
        var fechaSumada = new Date();                                      // Se crea una nueva variable y que recoge la fecha actual;
        fechaSumada = fechaSumada.setMinutes(fechaSumada.getMinutes()+20); // Se le añaden 20 minutos a la variable
        localStorage.setItem("fecha", JSON.stringify(fechaSumada));        // Se establece la variable en el Local Storage
    }else{
        // Si es llamado desde que carga la página pero en el LocalStorage no hay ninguna fecha establecida, la función se detiene, por que no hay carrito
        if(fechaSumada == null){
            return;
        }
    }

    /* La función se encarga de restar la fecha actual a la fecha adealantada 20 minutos, compara cuanto le queda para llegar a la hora adelantada. */
    function cuentaAtras() {

        const fechaLimite = new Date(fechaSumada);                  // Obtiene la fecha adealntada que es el tiempo límite para el carrito
        const fechaActual = new Date();                             // Crea una nueva fecha actual cada vez que se llama al método

        const totalSeconds = (fechaLimite - fechaActual) / 1000;    // Se resta la fecha fija límite a la fecha actual que cambia cada segundo

        // Se realizan los cáluclos para obtener los minutos y segundos restante del resultado de restar la fecha actual y la adelantada
        const minutos = Math.floor(totalSeconds / 60) % 60;
        const segundos = Math.floor(totalSeconds) % 60;

        tempsEl.innerText = formatarHora(minutos) + ":" + formatarHora(segundos);

        // Cuando la fecha límite sea igual a la fecha actual, la resta de ambos será cero y el carrito se eliminará al igual que el temporizador
        if(Math.floor(totalSeconds) == 0){
            infoTiempoEl.innerHTML = "<u>Carrito caducado!</u>"
            localStorage.removeItem("fecha");
            vaciar();
            clearInterval(temporizadorInterval);
        }

    }

    // Funcion que se encarga de obtener el fomato de hora con un cero delante cuando es menor que 10
    function formatarHora(time) {

        if(time > 10){
            return time;
        }else{
            return "0"+time;
        }
    }

    cuentaAtras();
    temporizadorInterval = setInterval(cuentaAtras, 1000);          // Se encarga de establecer una llamada la funcion cuenta atrás cada segundo.
}
      
    






