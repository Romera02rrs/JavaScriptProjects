window.onload = main;
var num1;
var num2;

function main(){
    document.getElementById("enviar").addEventListener("click", enviarForm, false);
    var inputs = document.getElementsByTagName("input");
    for (input of inputs){
        
        input.addEventListener("blur", ()=>{valida(input.id)}, false);
        if(input.id == "verifica"){
            generaPrueba(input);
            input.innerHTML = "";
        }
    }
}

function enviarForm(e){

    if(validarFormulario() && confirm("Enviar Formulario?")){
        return true;
    }
    e.preventDefault();
}

function validarFormulario(){
    borraErrores();
    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("apellidos");
    var dni = document.getElementById("dni");
    var email = document.getElementById("email");
    var reEmail = document.getElementById("reEmail");
    var username = document.getElementById("username");
    var clave = document.getElementById("clave");
    var reClave = document.getElementById("reClave");
    var verifica = document.getElementById("verifica");

    if(valida(nombre) && valida(apellidos) && valida(dni) && valida(email) && 
       valida(reEmail, email) && valida(username) && valida(clave) && valida(reClave, clave) && validaHumano(verifica)){
        console.log("Valido");
        return true;
    }else{
        console.log("No valido");
        return false;
    }
}

function valida(id, re){
    borraErrores();
    var elemento = document.getElementById(id)
    if(!re){
        if(elemento.checkValidity()){
            return true;
        }else{
            if(elemento.validity.valueMissing){
                error(elemento, "El campo " + elemento.name + " es obligatorio");
                return false;
            }else{
                if(elemento.validity.patternMismatch){
                    error(elemento, elemento.getAttribute("title"));
                }
            }
        }
    }else{
        if(elemento.value == re.value){
            return true;
        }else{
            error(elemento, elemento.getAttribute("title"));
            return false;
        }
    }
}

function generaPrueba(verifica){

    num1 = Math.floor(Math.random() * 11);
    num2 = Math.floor(Math.random() * 11);
    var mensaje = num1 + " + " + num2 + " = ?"
    verifica.setAttribute("placeholder", mensaje)
}

function validaHumano(verifica){

    if(num1 + num2 == verifica.value){
        return true;
    }else{
        error(verifica, verifica.getAttribute("title"));
        return false;
    }
}

function error(elemento, error){

    var mensajeErr = document.createTextNode(error);
    var pErr = document.createElement("p")
    pErr.setAttribute("class", "error");
    pErr.appendChild(mensajeErr);

    var padre = elemento.parentNode;
  
    padre.appendChild(pErr);
    
    elemento.focus();
}

function borraErrores(){

    var listaerrores = document.getElementsByClassName("error");
    for(elemento of listaerrores){
        console.log(elemento);
        elemento.parentNode.removeChild(elemento);
    }
}