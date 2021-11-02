window.onload = iniciar;

function iniciar(){

    document.getElementById("enviar").addEventListener("click", validar,false); 
}

function validar(e) {

    esborrarError();
    if(validarNom() && validarNeix() && validarTel() && confirm("confirmar")){
        return true;
    }else{
        e.preventDefault();
        return false;
    }
}

function esborrarError (){
  
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className="";
        
    }
}

function validarNom (){

    var element= document.getElementById("nom");
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element,"INtroduce un nombre");
        }
        if(element.validity.patternMismatch){
            error2(element, "El nombe debe tener entr 2 y 14 caracteres");
        }
        //error
        return false;
    }
    return true;
}

function validarNeix (){
    
    var element = document.getElementById("neix");
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element, "introduce una fecha");
        }
        if(element.validity.rangeOverflow){
            error2(element, "data minima ...");
        }
        if(element.validity.rangeUnderflow){
            error2(element, "La data maxima...");
        }
        //error
        return false;
    }
    return true;
}

function validarTel (){
    
    var element = document.getElementById("tel");
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element, "introduce una telefon");
        }
        if(element.validity.patternMismatch){
            error2(element, "format 999 999 999");
        }
        //error
        return false;
    }
    return true;
}

function error2(element, missatge){
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}