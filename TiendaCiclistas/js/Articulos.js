window.onload = main;

var numPro = 0;                         // Representa cada producto de la array productos
var precio = 0;                         // En esta variable será almacenado el precio total
var productoSeleccionado = false;       // Se guarda verdadero si el producto está siendo seleccionado
var productos = [];                     // Guarda todos los productos seleccionados

function main(){

    // Primero añadimos un addEvenListenre al botón siguiente y al select de las tallas.
    document.getElementById("siguiente").addEventListener("click", siguienteProducto, false);
    document.getElementById("talla").addEventListener("change", sumaTotal);
    
    // Cargamos el primer artículo y el usuario.
    cargaArticulo();
    cargaUsuario();
}

/**
 * Esta función se encarga de obtener los elementos y cargar en ellos las propiedades de cada producto
 * de la array de pedidos "pedidos".
*/
function cargaArticulo(){
    
    var nombreInput = document.getElementById("nombreArticulo");
    var precioInput = document.getElementById("precioArticulo");

    productoSeleccionado = false;

    nombreInput.setAttribute("value", pedidos[numPro].nombreArticulo);
    precioInput.setAttribute("value", pedidos[numPro].precioArticulo);
    
    cargaImagen();
    cargaTallas();
}


/**
 * Esta función se encarga de obtener el objeto usuario que se encuentra en el localStorage y  lo
 * muestra en un h2.
*/
function cargaUsuario(){

    var nombreEle = document.getElementById("nombreApellidos");

    var usuario = JSON.parse(localStorage.getItem("usuario"));

    nombreEle.appendChild(document.createTextNode("Bienvenido, " + usuario.nombre));
}

/**
 * Primero verifica si el producto ha sido seleccionado, se selecciona cambiado la talla a una talla que no sea 0.
 * Si el producto ha sido seleccioando, suma el precio del articulo al total.
 * Crea un objeto preducto con las propiedades obtenidas de la array "pedidos" y lo añade a la array de productos.
 * Haya sido seleccionado o no el producto, suma un número a la variable "numPro", que determina el producto que seleccionamos de la array "pedidos"
 * Comprueba si se ha llegado al último producto, si se ha llegado añade la array de productos al localStorage, envía el formulario y vamos a la página de carrito
 * Si no se ha llegado al último producto, carga el siguiente artículo y detiene el envío del formulario.
*/
function siguienteProducto(e){

    if(productoSeleccionado){
        precio += pedidos[numPro].precioArticulo;

        var talla = document.getElementById("talla").value;

        var producto = {
            nombreArticulo: pedidos[numPro].nombreArticulo,
            precioArticulo: pedidos[numPro].precioArticulo,
            tallas: talla,
            imagen: pedidos[numPro].imagen
        }
        productos.push(producto);
    }

    numPro++

    if(numPro == pedidos.length){
        localStorage.setItem("productos", JSON.stringify(productos));
        return;
    }

    cargaArticulo();
    e.preventDefault();
       
}

/** 
 * Se llama a esta función cuando se cambia la talla del prodcuto.
 * Si el valor de la talla es 0 la variable "productoSeleccionado" pasa a ser false y se establece el precio.
 * Por lo contrario la variable pasa a ser true, y se muestra el precio sumado.
 */
function sumaTotal(){
    
    var totalEle = document.getElementById("total");
    var tallaEle = document.getElementById("talla");

    do{
        totalEle.lastChild.parentNode.removeChild(totalEle.lastChild);
    }while(totalEle.lastChild != null);

    if(tallaEle.value == "0"){
        totalEle.appendChild(document.createTextNode((precio) + " €"));
        productoSeleccionado = false;
    }else{
        totalEle.appendChild(document.createTextNode((precio + pedidos[numPro].precioArticulo) + " €"));
        productoSeleccionado = true;
    }

}

// Carga la imágen
function cargaImagen(){

    var img = document.getElementById("imagen");
    
    img.setAttribute("src", "img/"+pedidos[numPro].imagen);
}

// Carga las tallas del producto
function cargaTallas(){

    var tallaInput = document.getElementById("talla");
    
    do{
        tallaInput.lastChild.parentNode.removeChild(tallaInput.lastChild);
    }while(tallaInput.lastChild != null);

    var opcion = document.createElement("option");
    opcion.appendChild(document.createTextNode("Seleccione talla (vacío si no lo desea)"));
    opcion.setAttribute("selected", "true");
    opcion.setAttribute("value", "0");
    tallaInput.appendChild(opcion);

    pedidos[numPro].tallas.forEach(talla => {

        var opcion = document.createElement("option");
        opcion.appendChild(document.createTextNode(talla));
        opcion.setAttribute("value", talla);

        tallaInput.appendChild(opcion);
    });
}