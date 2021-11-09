window.onload = main;

function main(){

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
    //debugger;

    txt = document.createTextNode("Seleccione una estación");
    opcion = document.createElement("option");
    opcion.setAttribute("disabled", true);
    opcion.setAttribute("selected", true);

    opcion.appendChild(txt);
    selectEstacio.appendChild(opcion);

    estacions.forEach(element => {
        if(element.provincia == provincia){
            element.estacio.forEach(estacio => {
                txt = document.createTextNode(estacio);
                opcion = document.createElement("option");
                opcion.setAttribute("value", txt);

                opcion.appendChild(txt);
                selectEstacio.appendChild(opcion);
            });
        }
    });
}

function validaFormulario(e){

    
}