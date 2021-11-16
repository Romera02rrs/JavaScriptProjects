window.onload = main;

var numPro = 0;

function main(){


    document.getElementById("talla").addEventListener("select", cargaTalla);
    cargaArticulo();
}

function cargaTalla(){

}

function cargaArticulo(){

    nombreInput = document.getElementById("nombreArticulo");
    precioInput = document.getElementById("precioArticulo");

    nombreInput.setAttribute("value", pedidos[numPro].nombreArticulo);
    precioInput.setAttribute("value", pedidos[numPro].precioArticulo);
    
    cargaTallas();
}

function cargaTallas(){

    tallaInput = document.getElementById("talla");
    
    do{
        tallaInput.lastChild.parentNode.removeChild(tallaInput.lastChild);
    }while(tallaInput.lastChild != null);

    pedidos[numPro].tallas.forEach(talla => {
       
        var opcion = document.createElement("option");
        opcion.appendChild(document.createTextNode(talla));
        opcion.setAttribute("value", talla);

        tallaInput.appendChild(opcion);
    });
}