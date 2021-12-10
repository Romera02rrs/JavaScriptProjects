var respuesta;

xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState==4 && this.status==200){
        respuesta = JSON.parse(this.responseText);
        console.log(respuesta);
    }
}
xmlhttp.open("GET","https://apiv1.geoapi.es/municipios?CPRO=03&type=JSON&key=&sandbox=1", true);
xmlhttp.send();

for (var item in respuesta) {
    console.log(item);
}
