window.onload = main;
var numero = 0;

function main(){

    document.getElementById("tipo").addEventListener("change", cambiaImg);
    document.getElementById("serie").addEventListener("blur", validaSerie);
    document.getElementById("mostrarDescripcio").addEventListener("click", clickDescripcio);
    document.getElementById("descripcio").addEventListener("keypress", ()=>cuenta(this.event));
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
    if (expReg.test(element.value)) {
        console.log("true");
        return true;
    } else {
        console.log("false")
        return false;
    }
}

function clickDescripcio(){

    divfDescripcio = document.getElementById("fDescripcio");
    divfDescripcio.style.display = "block";
}

function cuenta(event){
    if(event.key == ' '){
        numero++;
    }
    lbl = document.getElementById("descripcioLbl");
    lbl.innerHTML = "Descripció, palabras = " + numero;


    // OPCIÓN 2
    var txtArea = document.getElementById("descripcio").value;
    var palabras = txtArea.split(" ");
    var numeroPalabras = palabras.length;
    lbl.innerHTML = "Descripció, palabras = " + numeroPalabras;

}
// la imatge de la esquerra ha de canviar quna canvia el desplegable. 

//s'hha de validar el número de serie per a que el numero cumplisca 
// les seguent regles : 3 numeros inicials, 4 lletres en majúscules
// i acabar amb el níumero 1 o 2 , o amb la lletra A

//  Al clickar en mostrar Descripció apareixà el text area per poder excriure les dades.
// cada vegada que s'escriga una paraula al text area s'ha de contar el númerode paraules.
 