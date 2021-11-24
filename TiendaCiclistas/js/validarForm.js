window.onload = main;
var errores = [];
var usuario;

function main(){

    document.getElementById("siguiente").addEventListener("click", validaFormulario, false);
}

function validaFormulario(e){

    var valido = true;
    
    var Adesde = document.getElementById("anyoDesde");
    var Ahasta = document.getElementById("anyoHasta");

    var KMdesde = document.getElementById("kmDesde");
    var KMhasta = document.getElementById("kmHasta"); 

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
        crearUsuario(nombre.value, email.value, telefono.value);
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }else{
        error(errores);
        e.preventDefault();
    }
    errores = [];
}

function crearUsuario(nombre, email, telefono){

    usuario = {

        nombre: nombre,
        email: email,
        telefono: telefono
    }
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