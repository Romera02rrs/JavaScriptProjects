window.onload = main;

function main(){
    obtenerDatosApi();
}

function obtenerDatosApi (){

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState==4 && this.status==200){
            let respuesta = JSON.parse(this.responseText);
           
            var resultado = respuesta.dates["2021-12-15"].countries.Spain.regions[6].sub_regions;
            
            cargarDatos(resultado);
        }
    }
    xmlhttp.open("GET","https://api.covid19tracking.narrativa.com/api/2021-12-15/country/spain", true);
    xmlhttp.send();
}

function cargarDatos(resultado){
    console.log(resultado);

    for (let i = 0; i < 3; i++) {

        let totalInfectadosEle = document.getElementsByClassName("totalInfectados");
        totalInfectadosEle[i].innerHTML = resultado[i].today_confirmed;
        
        let totalDifuntosEle = document.getElementsByClassName("totalDifuntos");
        totalDifuntosEle[i].innerHTML = resultado[i].today_deaths;
    
        let nuevosInfectadosEle = document.getElementsByClassName("nuevosInfectados");
        nuevosInfectadosEle[i].innerHTML = resultado[i].today_new_confirmed;
    
        let nuevosDifuntosEle = document.getElementsByClassName("nuevosDifuntos");
        nuevosDifuntosEle[i].innerHTML = resultado[i].today_new_deaths;

        let ultimaActualizacion = document.getElementsByClassName("ultimaActualizacion");
        ultimaActualizacion[i].innerHTML = "Última actualización el " + resultado[i].date;
    }
}