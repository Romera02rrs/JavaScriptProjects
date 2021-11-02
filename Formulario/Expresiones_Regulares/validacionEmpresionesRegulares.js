window.onload = iniciar;

function iniciar(){

    document.getElementById("enviar").addEventListener("click", validar,false); 
}

function validar(e) {

    esborrarError();
    if(validarDNI() && validarTel() && validarFecha() && validarMatricula() && confirm("confirmar")){
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

    debugger;
    var regExpDNI = new RegExp(/^\d{8}[A-Z]{1}$/);
    var element= document.getElementById("DNI");
    if(!element.checkValidity()){
        if(!element.valueMissing){
            error2(element,"Introduce un DNI");
            return false;
        }
        if(!regExpDNI.test(element.value)){
            error2(element, "Formato del DNI 9999999A");
            return false;
        }
    }
    return true;
}

function validarTel (){
    
    var regExpTel = new RegExp(/^\d{3}\s\d{3}\s\d{3}$/);
    var element = document.getElementById("telefono");
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element, "Introduce un teléfono");
            return false;
        }
        if(!regExpTel.test(element.value)){
            error2(element, "Formato del teléfono 999 999 999");
            return false;
        }
    }
    return true;
}

function validarFecha (){

    var regExpFecha = new RegExp(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/);
    var element = document.getElementById("fecha");
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element, "Introduce una fecha");
            return false;
        }
        if(!regExpFecha.test(element.value)){
            error2(element, "Fecha no válida");
            return false;
        }
    }
    return true;
}

// function validarMatricula (){

//     var regExpMatricula = new RegExp(/^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$/);
//     var element= document.getElementById("matricula");
//     if(!element.checkValidity()){
//         if(element.validity.valueMissing){
//             error2(element,"Introduce una matrícula");
//             return false;
//         }
//         if(!regExpMatricula.test(element.value)){
//             error2(element, "Formato de la maytícula 9999 AAA (CH|LL)");
//             return false;
//         }
//     }
//     return true;
// }

function error2(element, missatge){
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}