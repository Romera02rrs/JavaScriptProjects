window.onload = main;

var numPro = 0;
var tallaSeleccionada;

function main(){

    document.getElementById("siguiente").addEventListener("click", siguienteProducto, false);
    document.getElementById("talla").addEventListener("change", sumaTotal);
    cargaArticulo();
}

function siguienteProducto(e){

    if(numPro == pedidos.length - 1){

    }else{
        numPro++;
        cargaArticulo();
        console.log(numPro);
        e.preventDefault();
    }   
}

function sumaTotal(){

    totalEle = document.getElementById("total");
    tallaInput = document.getElementById("talla").value;
    
    totalEle.appendChild(document.createTextNode(pedidos[numPro].precioArticulo));

    tallaSeleccionada = tallaInput;
}

function cargaArticulo(){

    var nombreInput = document.getElementById("nombreArticulo");
    var precioInput = document.getElementById("precioArticulo");

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