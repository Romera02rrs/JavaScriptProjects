function altaAutor(datos){

    var autor = creaAutor();

    console.log(autor);

    fetch("https://www.serverred.es/api/autores", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autor)
    }).then(response => response.json()).then(data => console.log(data)).catch(error => console.log(error));
}

function creaAutor(){

    let nombreEle = document.getElementById("nombre").value;
    let nacimientoEle = document.getElementById("nacimiento").value;

    let autor = {
        nombre: nombreEle,
        año_nacimiento: nacimientoEle
    }

    return autor;
}