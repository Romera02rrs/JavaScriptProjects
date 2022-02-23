window.onload = main
var token
var datosCategorias

function main(){
    document.getElementById("btnGravar").addEventListener("click", validar, false)
    comprobarToken()
    getDatosUsuario()
    borrarCateorias()
    estableceCategorias()
}

function comprobarToken(){
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if(tokenAux){
        token = tokenAux
    }else{
        alert("Debes iniciar sesion")
        window.location.href = "login.html"
    }
}

function getDatosUsuario(){
    fetch("https://news.serverred.es/api/areapersonal", {
        method: "GET",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Accept' : 'application/json',
            "auth-token": token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // funcion necesito los datos(data)
    })
    .catch(error => {
        console.log(error)
        //error2(document.getElementById("nom"), error)
    })
}

function estableceCategorias(){
    
    fetch("https://news.serverred.es/api/categories")
    .then(response => response.json())
    .then(data => {
        console.log(data.resultado)
        datosCategorias = data.resultado
        pintaCategorias()
    })
    .catch(error => console.log(error))
}

function pintaCategorias() {
    var filas = document.getElementById("listCategory");
    datosCategorias.forEach(element => {

        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(element.name))
        listItem.setAttribute("class", "list-group-item")
        
        filas.appendChild(listItem);
    })
}

function borrarCateorias(){
    var filas = document.getElementById("listCategory");

    do{
        filas.lastChild.parentNode.removeChild(filas.lastChild);
    }while(filas.lastChild != null);
}

function registrarCategoria() {

    var cat = {
        name: document.getElementById("nom").value,
        path: document.getElementById("nom").value

    }

    console.log(token);

    fetch("https://news.serverred.es/api/categories", {
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        },
            body: JSON.stringify(cat)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.error == null){
                main()
                //alert("Creado correctamente")
            }else{
                alert("ERROR")
                //error2(document.getElementById("col3Ele"), data.error)
            }
        })
        .catch(error => {
            console.log(error)
        })
}

/* ---------------------------------  VALIDACIÓN  ---------------------------------------------------- */

function validar(e) {
    e.preventDefault()
    esborrarError()
    if (validaNombre()) {

        registrarCategoria()
        return true

    } else {
        e.preventDefault()
        return false
    }
}

function validaNombre() {
    var element = document.getElementById("nom")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce una categoria")
        }else{
            error2(element, "La categoría debe tener 4 dígitos como mínimo")
        }

        //error(element)
        return false
    }
    return true
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge
    element.className = "form-control error"
    element.focus()
}


function esborrarError() {
    var formulari = document.forms[0]
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "form-control"
    }
    document.getElementById("btnGravar").className = "mt-2 btn btn-primary"
    document.getElementById("missatgeError").innerHTML = ""
}