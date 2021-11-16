window.onload = main;

function main(){
//rfr
    document.getElementById("ok").addEventListener("click", nuevoProducto);
    document.getElementById("borrar").addEventListener("click", borrar);

    document.getElementById("navProducto").addEventListener("click", redirigeProducto);
    document.getElementById("navTienda").addEventListener("click", redirigeTienda);
}

function redirigeProducto(){

    window.location.href = "altaProductos.html"
}

function redirigeTienda(){

    window.location.href = "tienda.html"
}