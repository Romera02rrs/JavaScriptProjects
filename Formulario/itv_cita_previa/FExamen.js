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

    if(validaComnustible() && validaFecha()){
        
    }else{
        e.preventDefault();
    }
}

function validaHora(){

    
}

function validaFecha(){

    fechaAdelantada = new Date();
    fechaAdelantada.setDate(fechaAdelantada.getDate() + 30);
    console.log(fechaAdelantada);
    
    fecha = document.getElementById("fecha");
    fechaSeleccionada = new Date(fecha.value);
    console.log(fechaSeleccionada);

    fechaActual = new Date();

    if(fechaSeleccionada > fechaAdelantada || fechaActual > fechaSeleccionada){
        console.log("hemos perdido perro");
       return false;
    }else{
        console.log("hemos ganado perro");
        return true;
    }
}

function validaComnustible(){

    select = document.getElementById("conbustible");
    if(select.value == "null"){;
        return false;
    }else{
        return true;
    }
}