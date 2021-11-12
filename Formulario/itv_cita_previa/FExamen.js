window.onload = main;
var errores = [];

function main(){

    setHora();

    document.getElementById("Enviar").addEventListener("click", validaFormulario, false);

    document.getElementById('alc').addEventListener("click", ()=>{cambioProvincia("Alacant")});
    document.getElementById('vlc').addEventListener("click", ()=>{cambioProvincia("Valencia")});
    document.getElementById('ctl').addEventListener("click", ()=>{cambioProvincia("Castello")});
}

function cambioProvincia(provincia){
    
    var selectEstacio = document.getElementById("estacio");

    do{
        selectEstacio.lastChild.parentNode.removeChild(selectEstacio.lastChild);
    }while(selectEstacio.lastChild != null);

    var txt = document.createTextNode("Seleccione una estación");
    var opcion = document.createElement("option");
    opcion.setAttribute("disabled", true);
    opcion.setAttribute("selected", true);
    opcion.setAttribute("value", null);

    opcion.appendChild(txt);
    selectEstacio.appendChild(opcion);

    estacions.forEach(element => {
        if(element.provincia == provincia){
            element.estacio.forEach(estacio => {
                var txt = document.createTextNode(estacio);
                var opcion = document.createElement("option");
                opcion.setAttribute("value", txt);

                opcion.appendChild(txt);
                selectEstacio.appendChild(opcion);
            });
        }
    });
}

function setHora(){

    // de 7 a 8 cada 15m

    var elemento = document.getElementById("hora");
    var horas = 6;

    for(let i = 0; i < 14; i++){
        horas += 1;
        var minutos = 0;
        for(let j = 0; j < 4; j++){
            if(minutos == 0){
                minutos = "00";
            }

            txt = document.createTextNode(horas+":"+minutos);
            opcion = document.createElement("option");
            minutos = parseInt(minutos);
            minutos += 15;

            opcion.setAttribute("value", txt);
            opcion.appendChild(txt);
            elemento.appendChild(opcion);

            if(horas == 20){
                return;
            }
        }
    }
}

function validaFormulario(e){

    var valido = false;

    //debugger;
    if(!validaEstacio()){
        var valido = false;
    }
    if(!validaMatricula()){
        var valido = false;
    }
    if(!validaComnustible()){
        var valido = false;
    }
    if(!validaFecha()){
        var valido = false;
    }
    if(!validaHora()){
        var valido = false;
    }
    if(!validaNombreApellido()){
        var valido = false;
    }
    if(!validaTelefono()){
        var valido = false;
    }
    if(!validaEmail()){
        var valido = false;
    }
    if(!validaTerminos()){
        var valido = false;
    }

    if(valido){
        
    }else{
        error(errores);
        e.preventDefault();
    }
    errores = [];
}

function validaEstacio(){

    var elemento = document.getElementById("estacio");

    if(elemento.value == "null"){
        errores.push("El campo estación es requerido *");
        return false;
    }else{
        return true;
    }
}

function validaMatricula(){

    var elemento = document.getElementById("matricula");

    if(elemento.checkValidity()){
        return true;
    }else{
        if(elemento.validity.valueMissing){
            errores.push("El campo matrícula es requerido *");
            return false;
        }else{
            if(elemento.validity.patternMismatch){
                errores.push("Debes introducir una matrícula válida");
                return false;
            }
        }
    }
}

function validaComnustible(){

    var select = document.getElementById("conbustible");
    if(select.value == "null"){;
        errores.push("El campo combustible es requerido *");
        return false;
    }else{
        return true;
    }
}

function validaFecha(){

    let fechaAdelantada = new Date();
    fechaAdelantada.setDate(fechaAdelantada.getDate() + 30);
    
    let fechaSeleccionada = new Date(document.getElementById("fecha").value);

    let diaSemana = fechaSeleccionada.getDay();

    let fechaActual = new Date();

    if(fechaSeleccionada > fechaAdelantada || fechaActual > fechaSeleccionada || diaSemana == 0 || fechaSeleccionada == "Invalid Date"){
        errores.push("Debes escogoger una fecha válida (domingos cerrado)");
        return false;
    }else{
        return true;
    }
}

function validaHora(){

    var elemento = document.getElementById("hora");

    if(elemento.value == "00:00"){
        errores.push("El campo hora es requerido *");
        return false;
    }else{
        return true;
    }
}

function validaNombreApellido(){

    var elemento = document.getElementById("nom");

    if(elemento.checkValidity()){
        return true;
    }else{
        if(elemento.validity.valueMissing){
            errores.push("El campo nombre es requerido *");
            return false;
        }else{
            if(elemento.validity.patternMismatch){
                errores.push("Debes introducir un nombre válido");
                return false;
            }
        }
    }

}

function validaTelefono(){

    var elemento = document.getElementById("telefon");

    if(elemento.checkValidity()){
        return true;
    }else{
        if(elemento.validity.valueMissing){
            errores.push("El campo número de teléfono es requerido *");
            return false;
        }else{
            if(elemento.validity.patternMismatch){
            errores.push("Debes introducir un número de teléfono válido");

                return false;
            }
        }
    }
}

function validaEmail(){

    var elemento = document.getElementById("email");

    if(elemento.checkValidity()){
        return true;
    }else{
        if(elemento.validity.valueMissing){
            errores.push("El campo eMail es requerido *");
            return false;
        }else{
            if(elemento.validity.patternMismatch){
            errores.push("Debes introducir un eMail válido");
                return false;
            }
        }
    }
}

function validaTerminos(){

    var elemento = document.getElementById("protecioDades");

    if(elemento.checked){
        return true;
    }else{
        errores.push("Debes haceptar los términos y condiciones");
        return false;
    }
}

function error(mensajes){

    elemento = document.getElementById("missatgeError");

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