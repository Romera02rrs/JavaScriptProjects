window.onload = main;
var resultado;

function main(){
    obtenerDatosApi();
}

function obtenerDatosApi (){

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState==4 && this.status==200){
            let respuesta = JSON.parse(this.responseText);
           
            resultado = respuesta.dates["2020-03-22"].countries.Spain.regions[7].sub_regions;
            
            cargarDatos();
        }
    }
    xmlhttp.open("GET","https://api.covid19tracking.narrativa.com/api/2020-03-22/country/spain", true);
    xmlhttp.send();
}

function cargarDatos(){
    
}