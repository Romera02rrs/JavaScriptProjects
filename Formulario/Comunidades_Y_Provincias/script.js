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

    var provincia = document.getElementById("comunidadesId").value;                         // Obtengo la comunidad del select de las comunidades
    var provSelectDiv = document.getElementById("provinciasSelectDiv");                     // Obtenfo el div donde se encuetra unicamente el select de provincias

    var selectFormProv = document.createElement("select");                                  // Creo el select y le añado sus atributos
    selectFormProv.setAttribute("id", "provinciasId");
    selectFormProv.setAttribute("name", "provincias");

    var optionSelected = document.createElement("option");                                  // Creo una opcion que será la primera opción ya seleccionada y que esta desactivada
    optionSelected.appendChild(document.createTextNode("Seleccione una provincia"));
    optionSelected.setAttribute("selected", true);
    optionSelected.setAttribute("disabled", true);
    selectFormProv.appendChild(optionSelected);                                             // Inserto la opción desactivada al select

    for(let item of datos){                                                                 // Bucle que recorre todas las comunidades
        if (item.comunitat == provincia){                                                   // Si encuentra la comunidad que he obtenido del select de comunidades
            for(let prov of item.provincies){                                               // Ralizo un bucle que recorre todas las provincias de la comunidad encontrada
                var option = document.createElement("option");                              // Creo opciones y las inserto en el select
                option.appendChild(document.createTextNode(prov));
                option.setAttribute("value", prov);
                selectFormProv.appendChild(option);
            }
        }
    }

    provinciasDiv.appendChild(selectFormProv);                                              // Inserto en el div el select
    provSelectDiv.replaceChildren(selectFormProv, selectFormProv);                          // Reemplazo el select del div
}