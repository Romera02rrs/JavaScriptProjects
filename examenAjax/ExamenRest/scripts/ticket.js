window.onload = main
var comanda

function main() {
    obtenerComanda()
    establecerValores()
    document.getElementById("print").addEventListener("click", print)
}

function obtenerComanda() {
    comanda = JSON.parse(localStorage.getItem("comanda"))
}

function establecerValores() {
    console.log(comanda);

    fecha = new Date();

    str = fecha.getHours() + ":" + fecha.getMinutes()

    document.getElementById("mesa").appendChild(document.createTextNode(comanda.mesa))
    document.getElementById("nombre").appendChild(document.createTextNode(comanda.nombre))
    document.getElementById("comensales").appendChild(document.createTextNode(comanda.comensales))
    document.getElementById("camarero").appendChild(document.createTextNode(comanda.user))
    document.getElementById("fecha").appendChild(document.createTextNode(comanda.fechaEntrada))
    document.getElementById("hora").appendChild(document.createTextNode(str))


}

function print() {
    var printwin = window.open("");
    printwin.document.write(document.getElementById("bodyPrint").innerHTML);
    printwin.print()
}