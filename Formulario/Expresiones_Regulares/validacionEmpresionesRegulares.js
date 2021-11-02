window.onload = iniciar;

function iniciar(){

    document.getElementById("enviar").addEventListener("click", validar,false); 
}

function validar(e) {

    esborrarError();
    if(validarDNI() && validarTel() && validarFecha() && confirm("confirmar")){
        return false;
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

function validarDNI (){

    var exp = new RegExp(/^[0-9]{8}[A-Za-z]{1}$);
    var element= document.getElementById("DNI");
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element,"Introduce un DNI");
        }
        if(element.validity.patternMismatch){
            error2(element, "Formato del DNI 9999999A");
        }
        //error
        return true;
    }
    return true;
}

function validarTel (){
    
    var element = document.getElementById("telefono");
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element, "Introduce una teléfono");
        }
        if(element.validity.patternMismatch){
            error2(element, "Formato del teléfono 999 999 999");
        }
        //error
        return true;
    }
    return true;
}

function validarFecha (){
    
    var element = document.getElementById("fecha");
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

function error2(element, missatge){
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}