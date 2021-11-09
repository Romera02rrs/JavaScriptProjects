window.onload = main;
var numero = 0;

function main(){

    document.getElementById("enviar").addEventListener("click", enviarForm, false);
    document.getElementById("tipo").addEventListener("change", cambiaImg);
    document.getElementById("serie").addEventListener("blur", validaSerie);
    document.getElementById("mostrarDescripcio").addEventListener("click", clickDescripcio);
    document.getElementById("descripcio").addEventListener("keypress", ()=>cuenta(this.event));
}

function error(){
    
    divError = document.getElementById("capaError");

    pError = document.createElement("p");
    texto = document.createTextNode("Error en la validación");

    pError.appendChild(texto);
    divError.appendChild(pError);
    divError.replaceChildren(pError, pError);

}

function borrarError(){

    divError = document.getElementById("capaError");
    pError = document.createElement("p");

    divError.appendChild(pError);
    divError.replaceChildren(pError, pError);
}

function enviarForm(e){

    if(validaSerie()){
        return true;
    }else{
        e.preventDefault();
        return false;
    }
}

function cambiaImg(tipo){

    img = document.getElementById("imagen");
    tipo = document.getElementById("tipo").value;
    switch(tipo){
        case "distribucio":
            img.setAttribute("src", "img/distribucio.jpg");
            break;
        case "oficina":
            img.setAttribute("src", "img/oficina.jpg");
            console.log("llega");
            break;
        case "producció":
            img.setAttribute("src", "img/producion.jpg");
            break;
    }
}

function validaSerie(){

    var expReg = new RegExp(/^\d{3}[A-Z]{4}([1-2]|[A])$/);
    var element = document.getElementById("serie");
    if(element.value == null){
        error();
        return false;
    }else{
        if (expReg.test(element.value)) {
            borrarError();
            return true;
        } else {
            error();
            return false;
        }    
    }
}

function clickDescripcio(){

    divfDescripcio = document.getElementById("fDescripcio");
    divfDescripcio.style.display = "block";
}

function cuenta(event){
    
    // OPCIÓN 1
    // if(event.key == ' '){
    //     numero++;
    // }
    // lbl = document.getElementById("descripcioLbl");
    // lbl.innerHTML = "Descripció, palabras = " + numero;


    // OPCIÓN 2
    var txtArea = document.getElementById("descripcio").value;
    var palabras = txtArea.split(" ");
    var numeroPalabras = palabras.length;
    lbl.innerHTML = "Descripció, palabras = " + numeroPalabras;
}