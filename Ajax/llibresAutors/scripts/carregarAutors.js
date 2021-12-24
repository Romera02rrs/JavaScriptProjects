window.onload = inici;

function inici() {
    cargarAutores();
    document.getElementById("nouAutor").addEventListener("click", nouAutor);
}

function cargarAutores() {
    fetch("https://www.serverred.es/api/autores")
        .then(response => response.json())
        .then(data =>
            carregarAutors(data));
}

function nouAutor() {
    window.location.href = "altaAutors.html";
}

function carregarAutors(data) {
    data.resultado.forEach(element => {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var buttonEsborrar = document.createElement("button");
        buttonEsborrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        buttonEsborrar.setAttribute("id", element._id);
        buttonEsborrar.setAttribute("onclick", "comprovarEsborrar(this)")
        var txt = document.createTextNode("Esborrar");
        buttonEsborrar.appendChild(txt);
        td1.appendChild(buttonEsborrar);
        var td2 = document.createElement("td");
        var buttonModificar = document.createElement("button");
        buttonModificar.setAttribute("class", "btn btn-primary btn-lg my-3");
        buttonModificar.setAttribute("id", element._id);
        buttonModificar.setAttribute("onclick", "paginaModificar(this)");
        var txt = document.createTextNode("Modificar");
        buttonModificar.appendChild(txt);
        td2.appendChild(buttonModificar);
        var td3 = document.createElement("td");
        var txt1 = document.createTextNode(element.nombre)
        td3.appendChild(txt1);
        var td4 = document.createElement("td");
        var txt2 = document.createTextNode(element.año_nacimiento)
        td4.appendChild(txt2);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        var content = document.getElementById("files");
        content.appendChild(tr);
    });
}

function esborrarAutor(id) {
    fetch("https://serverred.es/api/autores/" + id, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

function comprovarEsborrar(elem) {
    fetch('https://serverred.es/api/libros/')
        .then(response => response.json())
        .then(data => {
            var pot = true;
            data.resultado.forEach(element => {
                if (element.autor == elem.id) {
                    pot = false;
                }
            })
            if (pot == false) {
                alert("No pots borrar un autor si te un libre creat, borra el llibre primer i despres torna a intentar-ho.");
            } else {
                esborrarAutor(elem.id);
            }
        })
        .catch(error => console.log(error));
}

function paginaModificar(elem) {
    localStorage.setItem("idAutor", JSON.stringify(elem.id));
    window.location.href = "modificarAutors.html";
    
}