window.onload = main;
var errores = [];

function main(){

    cargaCoches();
    filtro();
}

function filtro(){

    document.getElementById("filtrar").addEventListener("click", validaFormulario, false);
    cargaFecha();
}

function validaFormulario(e){

    e.preventDefault();

    var valido = true;

    //debugger;
    if(!validaA()){
        valido = false;
    }
    if(!validaKM()){
        valido = false;
    }

    if(valido){
        cambiaArray();
        errores = [];
        error(errores)
    }else{
        error(errores);
        e.preventDefault();
    }
    errores = [];
}

function cambiaArray(){

    var desdeA = parseInt(document.getElementById("anyoDesde").value);
    var hastaA = parseInt(document.getElementById("anyoHasta").value);

    var desdeKM = parseInt(document.getElementById("kmDesde").value);
    var hastaKM = parseInt(document.getElementById("kmHasta").value);

    var cambioCar = document.getElementsByName("cambio");
    var cambioCarChecked;

    var nuevoArray = new Array();

    cambioCar.forEach(element => {
        if(element.checked){
            cambioCarChecked = element;
        };
    });

    console.log(cambioCarChecked.get);

    data["cars"].forEach(coche => { 
        if(coche.anyo >= desdeA && 
            coche.anyo <= hastaA && 
            coche.km >= desdeKM 
            // coche.km <= hastaKM && 
            // (cambioCarChecked == coche.cambio || cambioCarChecked == "Todos"))
        )
            {
            nuevoArray.push(coche);
        }
    });

    data["cars"] = nuevoArray;
    cargaCoches();
}


function validaKM(){

    var desdeKM = document.getElementById("kmDesde").value;
    var hastaKM = document.getElementById("kmHasta").value;

    if(desdeKM == "0" || hastaKM == "0"){
        errores.push("El campo km es requerido *");
        return false;
    }else{
        
        if(parseInt(desdeKM) <= parseInt(hastaKM)){
            return true;
        }else{
            errores.push("Km desde no puede ser mayor que hasta");
            return false;
        }
    }
}

function validaA(){

    var desdeA = document.getElementById("anyoDesde").value;
    var hastaA = document.getElementById("anyoHasta").value;

    if(desdeA == "null" || hastaA == "null"){
        errores.push("El campo año de matriculacion es requerido *");
        return false;
    }else{
        if(desdeA <= hastaA){
            return true;
        }else{
            errores.push("Año desde no puede ser mayor que hasta");
            return false;
        }
    }
}

function error(mensajes){

    elemento = document.getElementById("errorMensaje");

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

function cargaFecha(){

    var fechaDesde = document.getElementById("anyoDesde");
    var fechaHasta = document.getElementById("anyoHasta");

    cargaFechaSelect(fechaDesde);
    cargaFechaSelect(fechaHasta);
}

function cargaFechaSelect(element){

    var arrayOrd = new Array();

    do{
        element.lastChild.parentNode.removeChild(element.lastChild);
    }while(element.lastChild != null);

    var txt = document.createTextNode("fecha");
    var opcion = document.createElement("option");
    opcion.setAttribute("disabled", true);
    opcion.setAttribute("selected", true);
    opcion.setAttribute("value", null);

    opcion.appendChild(txt);
    element.appendChild(opcion);

    data["cars"].forEach(coche => {

        arrayOrd.push(coche.anyo);
    });

    arrayOrd.sort(function(a, b){return a - b});

    var result = arrayOrd.filter((item,index)=>{
        return arrayOrd.indexOf(item) === index;
      })

    result.forEach(coche => {

        var txt = document.createTextNode(coche);
        var anyoaux = coche;
        var opcion = document.createElement("option");
        opcion.setAttribute("value", anyoaux);

        opcion.appendChild(txt);
        element.appendChild(opcion);
    });
}

function cargaCoches(){

    var listaCoches = document.getElementById("listado");
    var cocheItem = "";
    var listadoFinal = "";

    data["cars"].forEach(coche => {
        cocheItem = "<div class='card mb-4'><a href='reserva.html'><img class='card-img-top' src='img/"+coche.img+"' alt='"+coche.marca+"' /></a>";
        cocheItem += "<div class='card-body'><h2 class='card-title'>"+coche.marca + " " + coche.modelo+"+</h2>";
        cocheItem += "<div class='row justify-content-end'><div class='p-2 mb-1  col-md-3 offset-md-3 bg-warning rounded text-center'>";
        cocheItem += "<h2 class='font-weight-bold'>"+coche.precio+" €</h2></div></div>";
        cocheItem += "<div class='row'>";
        cocheItem += "<div class='col p-3 text-center border-bottom border-dark'>Año</div>";
        cocheItem += "<div class='col p-3 text-center border-bottom border-dark'>Kilometros</div>";
        cocheItem += "<div class='col p-3 text-center border-bottom border-dark'>Cambio</div>";
        cocheItem += "<div class='col p-3 text-center border-bottom border-dark'>Combustible</div>";
        cocheItem += "<div class='w-100'></div>";
        cocheItem += "<div class='col p-3 text-center'><strong>"+coche.anyo+"</strong></div>";
        cocheItem += "<div class='col p-3 text-center'><strong>"+coche.km+"</strong></div>";
        cocheItem += "<div class='col p-3 text-center'><strong>"+coche.cambio+"</strong></div>";
        cocheItem += "<div class='col p-3 text-center'><strong>"+coche.Combustible+"</strong></div>";
        cocheItem += "</div><a class='btn btn-primary m-3' href='reserva.html'>Reservar</a></div></div>";

        listadoFinal += cocheItem;
    });

    listaCoches.innerHTML = listadoFinal;
}