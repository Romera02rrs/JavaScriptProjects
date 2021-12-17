window.onload = main;

function main (){

    document.getElementById("enviar").addEventListener("click",validaFormulario, false);

}

function validaFormulario(e){ 
    e.preventDefault;
    validaNombre();
    let nacimiento = document.getElementById("naciemiento");
}

function validaNombre(){
    let nombre = document.getElementById("nombre");

    if (nombre.checkValidity()){
        console.log("MUY BIEN");
    }else{

    }
}