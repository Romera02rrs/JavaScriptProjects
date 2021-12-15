const fs = require("fs")

claves = new Array();
valores = new Array();

// Guardar en en un string la información del documento "Plantilla.txt"
plantilla = fs.readFileSync("Plantilla.txt","utf-8");

// Crea dos arrays, uno con las claves donde deben estar los datos y otra array con los datos
fs.readFileSync("basedades.csv","utf8").split("\n").forEach(function(line, index){
    if (index == 0) {
        claves = line.split(";");
        console.log(claves);
    } else {
        valores = line.split(";");
        console.log(valores);
    }
});

// Busca las claves en el documento y reemplaza su valor por los valores correspondientes
for (let i = 0; i < claves.length; i++) {
    plantilla = plantilla.replace(claves[i], valores[i]);
}

// Crear una carpeta llamada resultat
fs.mkdir("./resultat/",function (err){
    if (err) {
        console.log(err);
    }
});

var aleatorio = Math.floor(Math.random()*1000);

// Crea un fichero con el nombre especificado y le inserta el string de plantilla con todos los datos actualizados
fs.appendFile("./resultat/"+valores[0]+", "+valores[1]+" - "+aleatorio+".txt", plantilla + "\n", function (err) {
    if (err) {
        console.log(err);
    }
});