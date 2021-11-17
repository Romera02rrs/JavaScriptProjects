window.onload = main;

var productos;

function main(){

    obtenerProductos();

    console.log(productos);
}

function obtenerProductos(){

    productos = JSON.parse(localStorage.getItem("productos"));
}