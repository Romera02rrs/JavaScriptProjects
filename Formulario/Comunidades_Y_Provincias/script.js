window.onload = main;

function main(){

    document.getElementById("enviar").addEventListener("click", procesarFormulario);;
    cargaComunidades();
}

function cargaComunidades(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'data.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            let datos = JSON.parse(this.responseText);

            /*----------------------------------------------------------------------------------------------------------------*/

            var selectForm = document.getElementById("comunidadesId");
            var aux = "<option disabled selected>Selecciona una comunidad</option>";

            for(let item of datos){
                
                aux += "<option value='"+item.comunitat+"'>"+item.comunitat+"</option>";
            }
            selectForm.innerHTML = aux;
            
            /*----------------------------------------------------------------------------------------------------------------*/

        }
    }
}

function procesarFormulario(){

}