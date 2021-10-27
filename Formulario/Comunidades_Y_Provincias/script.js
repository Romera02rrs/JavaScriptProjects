window.onload = main;
var datos;

function main(){

    //document.getElementById("enviar").addEventListener("click", procesarFormulario);
    document.getElementById("comunidadesId").addEventListener("input", cargaProvincias);
    cargaComunidades();
}

function cargaComunidades(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'data.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            datos = JSON.parse(this.responseText);
            //console.log(datos);

            /*----------------------------------------------------------------------------------------------------------------*/

            var selectFormComun = document.getElementById("comunidadesId");
            var aux = "<option disabled selected>Selecciona una comunidad</option>";

            for(let item of datos){
                
                aux += "<option value='"+item.comunitat+"'>"+item.comunitat+"</option>";
            }
            selectFormComun.innerHTML = aux;
            
            /*----------------------------------------------------------------------------------------------------------------*/

        }
    }
}

function cargaProvincias(){

    var provincia = document.getElementById("comunidadesId").value;
    var selectFormProv = document.getElementById("provinciasId");
    var aux = "<option disabled selected>Seleccione una provincia</option>";

    for(let item of datos){
        if (item.comunitat == provincia){
            for(let prov of item.provincies){
                aux += "<option value='"+prov+"'>"+prov+"</option>";
            }
        }
    }
    selectFormProv.innerHTML = aux;
}