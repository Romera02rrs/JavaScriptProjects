function altaAutor(){

    var autor = creaAutor();

    fetch("https://www.serverred.es/api/autores", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autor)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = "llistatAutors.html";
    })
    .catch(error => console.log(error));
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

function altaLibro() {

    var libro = creaLibro();

    fetch("https://www.serverred.es/api/libros", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(libro)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // window.location.href = "llistatLlibres.html";
    })
    .catch(error => console.log(error));
}

function creaLibro(){

    let tituloEle = document.getElementById("titol").value;
    let editorialEle = document.getElementById("editorial").value;
    let precioEle = document.getElementById("preu").value;
    let autorEle = document.getElementById("autor").value;

    let libro = {
        titulo: tituloEle,
        editorial: editorialEle,
        precio: precioEle,
        autor: autorEle
    }

    return libro;
}