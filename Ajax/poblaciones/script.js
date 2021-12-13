let poblacionsCV =[];

window.onload = main;

function main(){

    document.getElementById("btn").addEventListener("click", carga);;
}

function carga(){

    cargarPolaciones('03');

    cargarPolaciones('12');

    cargarPolaciones('46');

    completar();
}


function cargarPolaciones (prov){
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState==4 && this.status==200){
        let respuesta = JSON.parse(this.responseText);
       
        respuesta.data.forEach(element => {
            poblacionsCV.push(element.DMUN50);
        });
        cambiaNumeroTotal(poblacionsCV.length);
    }
}
xmlhttp.open("GET","https://apiv1.geoapi.es/municipios?CPRO="+prov+"&type=JSON&key=&sandbox=1", true);
xmlhttp.send();
}

function cambiaNumeroTotal(num){

    let poblaciones = document.getElementById("numeroPoblaciones");
    poblaciones.innerHTML = num;
}

function completar(){
    $( function() {
        $( "#tags" ).autocomplete({
          source: poblacionsCV
        });
      } );
    
}
