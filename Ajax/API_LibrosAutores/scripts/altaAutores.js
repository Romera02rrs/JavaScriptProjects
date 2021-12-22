window.onload = main;
var errores = [];

function main (){

    document.getElementById("enviar").addEventListener("click",validaFormulario, false);
}

function validaFormulario(e){ 

    var valido = true;

    if(!validaNombre()){
        valido = false;
    }

    if(!validaNacimiento()){
        valido = false;
    }

    if(valido){
        
    }else{
        imprimeError(errores);
        e.preventDefault();
    }
    errores = [];
}

function validaNombre(){
    let nombre = document.getElementById("nombre");

    if (nombre.checkValidity()){
        nombre.setAttribute("class", "form-control");
        return true;
    }else{
        errores.push("Nombre no es válido");
        nombre.setAttribute("class", "form-control border-danger");
        return false;
    }
}

function validaNacimiento(){

    let nacimiento = document.getElementById("nacimiento");

    if (nacimiento.checkValidity()){
        nacimiento.setAttribute("class", "form-control");
        return true;
    }else{
        errores.push("Año de nacimiento no es válido");
        nacimiento.setAttribute("class", "form-control border-danger");
        return false;
    }
}

function imprimeError(errores){

    var mensajes = document.getElementById("missatgeError");

    var lista = document.createElement("ul");


    errores.forEach(error => {

        lis = document.createElement("li");

        var msj = document.createTextNode(error);
        
        lis.appendChild(msj);
        lista.appendChild(lis);
    })

    mensajes.appendChild(lista);
    mensajes.replaceChildren(lista, lista);
}