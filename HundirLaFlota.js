window.onload = main;

var partida1 = [00,01,02,03,04,,96,97,98,99,,09,19,29,,90,91];
var partida2 = [00,10,20,30,40,,69,79,89,99,,07,08,09,,80,90];
var partida3 = [04,14,24,34,44,,70,71,72,73,,77,78,79,,95,96];
var partida4 = [84,85,86,87,88,,01,11,21,31,,07,17,27,,52,62];
var tablero;

var fallos = 0;
var aciertos = 0;

function main(){

    escogePartida();
    pintar_tablero();
}

function escogePartida(){

    var numAleatorio = Math.random() * 3;
    numAleatorio = numAleatorio.toFixed(0);
    numAleatorio = parseInt(numAleatorio);

    switch(numAleatorio){
        case 0: 
            tablero = partida1;
            console.log(1);
            break;
        case 1: 
            tablero = partida2;
            console.log(2);
            break;
        case 2: 
            tablero = partida3;
            console.log(3);
            break;
        case 3: 
            tablero = partida4;
            console.log(4);
            break;
        default:
            console.log("error");
    }
}

function disparo(elemento){
    var elemento = elemento.id;
    comprueba(elemento);
}

function comprueba(elemento){
    
    var posicion = elemento;
    var estilo = document.getElementById(posicion);

    if(document.getElementById(posicion).innerText == "X"){
        if(tablero.includes(parseInt(posicion))){
            console.log("tocado");
            document.getElementById(posicion).innerHTML = "<td>B</td>";
            estilo.style.backgroundColor = '#DAF7A6';
            aciertos ++;
            document.getElementById("aciertos").innerHTML ="Aciertos " + aciertos + "/14"
            if(aciertos == 14){
                document.write("<h1>Has ganado</h1>");
            }
        }else{
            console.log("agua");
            document.getElementById(posicion).innerHTML = "<td></td>";
            estilo.style.backgroundColor = '#C00037';
            fallos ++;
            document.getElementById("fallos").innerHTML ="Fallos " + fallos + "/10"
            if(fallos==10){
                document.write("<h1>Has perdido</h1>");
            }
        }
    }
    console.log(posicion);
}

function pintar_tablero(){

    let campo = document.getElementById("campo");
    let aux;
    aux = "<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th>";
    for(i = 0; i < 10; i++){
        aux += "<tr><th>" + ( i + 1) + "</th>";
        for(j = 0; j < 10; j++){
            aux += "<td  onclick=\"disparo(this)\" id = " + i + j + ">X</td>";
        }
        aux += "</tr>";
    }
    campo.innerHTML = aux;
}