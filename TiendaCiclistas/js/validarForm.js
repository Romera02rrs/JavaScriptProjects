window.onload = main;
var errores = [];

function main(){

    document.getElementById("siguiente").addEventListener("click", validaFormulario, false);
}

function validaFormulario(e){

    var valido = true;
    
    var nombre = document.getElementById("nombre");
    var email = document.getElementById("email");
    var telefono = document.getElementById("telefono");

    //debugger;
    if(!valida(nombre)){
        valido = false;
    }
    if(!valida(email)){
        valido = false;
    }
    if(!valida(telefono)){
        valido = false;
    }

    if(valido){
        
    }else{
        error(errores);
        e.preventDefault();
    }
    errores = [];
}

function valida(elemento){

    if(elemento.checkValidity()){
        return true;
    }else{
        if(elemento.validity.valueMissing){
            errores.push("El campo ("+ elemento.name +") es requerido *");
            return false;
        }else{
            if(elemento.validity.patternMismatch){
                errores.push("Debes introducir un "+ elemento.name +" valido");
                return false;
            }
        }
    }
}

function error(mensajes){

    elemento = document.getElementById("mensajeError");

    lista = document.createElement("ul");

    for(var i = 0; i < mensajes.length; i ++){

        lis = document.createElement("li");

        var msj = document.createTextNode(mensajes[i]);
        
        lis.appendChild(msj);
        lista.appendChild(lis);
    }
    
    elemento.appendChild(lista);
    elemento.replaceChildren(lista, lista);
}