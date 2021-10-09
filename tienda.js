window.onload = main;

function main(){

    document.getElementById("borrar").addEventListener("click", borrar);
    document.getElementById("vaciar").addEventListener("click", vaciar);
    document.getElementById("navProducto").addEventListener("click", redirigeProducto);
    document.getElementById("navTienda").addEventListener("click", redirigeTienda);
    cargaProductos();
    cargaCarrito();
    calculaPrecio();
    compruebaFecha(false);
    
}

function redirigeProducto(){

    window.location.href = "altaProductos.html"
}

function redirigeTienda(){

    window.location.href = "tienda.html"
}