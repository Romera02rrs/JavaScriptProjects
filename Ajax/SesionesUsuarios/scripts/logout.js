window.onload = main

function main(){
    document.getElementById("enviar").addEventListener("click", salir)
}

function salir(){
    localStorage.removeItem("token")
    window.location.href = ""
}