window.onload = main;

function main(){
    document.getElementById("enviar").addEventListener("click", validarFormulario, false);
}

function validarFormulario(e){
    var nombre = document.getElementById("nombre");

    if(nombre.checkValidity()){
        console.log("Valido");
        e.preventDefault();
    }else{
        console.log("No valido");
        e.preventDefault();
    }
}