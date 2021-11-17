window.onload = main;

var numPro = 0;
var precio = 0;
var productoSeleccionado = false;
var productos = [];

function main(){

    document.getElementById("siguiente").addEventListener("click", siguienteProducto, false);
    document.getElementById("talla").addEventListener("change", sumaTotal);
    cargaArticulo();
}

function siguienteProducto(e){

    debugger;

    if(productoSeleccionado){
        precio += pedidos[numPro].precioArticulo;

        var producto = {
            nombreArticulo: pedidos[numPro].nombreArticulo,
            precioArticulo: pedidos[numPro].precioArticulo,
            tallas: pedidos[numPro].tallas,
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

function cargaArticulo(){
    
    var nombreInput = document.getElementById("nombreArticulo");
    var precioInput = document.getElementById("precioArticulo");

    productoSeleccionado = false;

    nombreInput.setAttribute("value", pedidos[numPro].nombreArticulo);
    precioInput.setAttribute("value", pedidos[numPro].precioArticulo);
    
    cargaImagen();
    cargaTallas();
}

function cargaImagen(){

    var img = document.getElementById("imagen");
    
    img.setAttribute("src", "img/"+pedidos[numPro].imagen);
}

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