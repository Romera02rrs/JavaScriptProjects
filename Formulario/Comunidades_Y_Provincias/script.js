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
                var option = document.createElement("option");
                option.appendChild(document.createTextNode(item.comunitat));
                option.setAttribute("value", item.comunitat);
                selectFormComun.appendChild(option);
            }
            
            /*----------------------------------------------------------------------------------------------------------------*/

        }
    }
}

function cargaProvincias(){

    var provincia = document.getElementById("comunidadesId").value;
    var provinciasDiv = document.getElementById("provinciasDiv");

    document.getElementById("provinciasDiv").removeChild(document.getElementById("provinciasId"));
    document.getElementById("provinciasDiv").removeChild(document.getElementById("provinciasDiv").firstChild);

    var labelFormProv = document.createElement("label");
    labelFormProv.appendChild(document.createTextNode("Selecciona su provincia"));
    labelFormProv.setAttribute("for", "provinciasID");

    var selectFormProv = document.createElement("select");
    selectFormProv.setAttribute("id", "provinciasId");
    selectFormProv.setAttribute("name", "provincias");

    var optionSelected = document.createElement("option");
    optionSelected.appendChild(document.createTextNode("Seleccione una provincia"));
    optionSelected.setAttribute("selected", true);
    optionSelected.setAttribute("disabled", true);
    selectFormProv.appendChild(optionSelected);

    for(let item of datos){
        if (item.comunitat == provincia){
            for(let prov of item.provincies){
                
                var option = document.createElement("option");
                option.appendChild(document.createTextNode(prov));
                option.setAttribute("value", prov);
                selectFormProv.appendChild(option);
            }
        }
    }
    
    provinciasDiv.appendChild(labelFormProv);
    provinciasDiv.appendChild(selectFormProv);

    console.clear();
    console.log(provinciasDiv);

    provinciasDiv.appendChild(selectFormProv);
}