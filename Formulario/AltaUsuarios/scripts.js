window.onload = main;

function main(){
    document.getElementById("enviar").addEventListener("click", validarFormulario, false);
}

function validarFormulario(e){
    var apellidos = document.getElementById("apellidos");
    var DNI = document.getElementById("DNI");
    var email = document.getElementById("email");
    var reEmail = document.getElementById("reEmail");
    var username = document.getElementById("username");
    var clave = document.getElementById("clave");
    var reClave = document.getElementById("reClave");
    var verifica = document.getElementById("verifica");


    if(validaNombre()){
        console.log("Valido");
        e.preventDefault();
    }else{
        console.log("No valido");
        e.preventDefault();
    }
}

function validaNombre(){
    var nombre = document.getElementById("nombre");
    if(nombre.checkValidity()){
        borraError(nombre);
        return true;
    }else{
        if(nombre.validity.valueMissing){
            console.log("vacio");
            error(nombre, "vacio");
            return false;
        }
    }
}

function error(elemento, error){

    var mensajeErr = document.createTextNode(error);
    var pErr = document.createElement("p")
    pErr.setAttribute("class", "error");
    pErr.appendChild(mensajeErr);

    var padre = elemento.parentNode;
    padre.appendChild(pErr);

    var ultimoEle = padre.lastChild;
    console.log(ultimoEle);
    //ultimoEle.replaceWith(pErr);
    padre.replaceChild(pErr, ultimoEle)
}

function borraError(elemento){
    var errorEle = elemento.querySelector(".error");
    console.log(errorEle);
    if(errorEle){
        errorEle.parentNode.removeChild(errorEle);
    }
}