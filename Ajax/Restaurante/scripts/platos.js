window.onload = main
var token
var datosPlatos

function main() {
    comprobarToken()
    document.getElementById("newPlato").addEventListener("click", nuevoPlato)
    borrarPlatos()
    obtenerDatosPlatos()
}

function comprobarToken() {
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if (tokenAux) {
        token = tokenAux
        getDatosUsuario()
    } else {
        alert("Debes iniciar sesion")
        window.location.href = "login.html"
    }
}

function getDatosUsuario() {
    fetch("https://userprofile.serverred.es/api/areapersonal", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    })
    .then(response => response.json())
    .then(data => {
        setImg(data.data.user)
    })
    .catch(error => {
        console.error(error);
    })
}

function setImg(user) {

    let avatar = document.getElementById("avatar");
    avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/" + user.avatar);
}

function borrarPlatos() {
    var filas = document.getElementById("files");

    do {
        filas.lastChild.parentNode.removeChild(filas.lastChild);
    } while (filas.lastChild != null);
}

function obtenerDatosPlatos() {
    fetch("https://restaurante.serverred.es/api/platos", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.data.data)
        datosPlatos = data.data.data
        muestraPlatos(data.data.data)
    })
    .catch(error => {
        console.error(error)
    })
}

function muestraPlatos(resultado) {
    var filas = document.getElementById("files");
    resultado.forEach(plato => {

        var fila = document.createElement("tr");

        var columna1 = document.createElement("td");
        var esborrarBtb = document.createElement("button");
        esborrarBtb.setAttribute("class", "btn btn-primary btn-lg my-3");
        esborrarBtb.setAttribute("id", plato._id);
        esborrarBtb.addEventListener("click", borrar);
        esborrarBtb.innerHTML = "Esborrar";
        columna1.appendChild(esborrarBtb);
        fila.appendChild(columna1);

        var columna2 = document.createElement("td");
        var ModificarBtn = document.createElement("button");
        ModificarBtn.setAttribute("class", "btn btn-primary btn-lg my-3");
        ModificarBtn.setAttribute("id", plato._id);
        ModificarBtn.addEventListener("click", modificarplato);
        ModificarBtn.innerHTML = "Modificar";
        columna2.appendChild(ModificarBtn);
        fila.appendChild(columna2);

        var columna3 = document.createElement("td");
        var nombre = document.createElement("p");
        nombre.innerHTML = plato.nombre;
        columna3.appendChild(nombre);
        fila.appendChild(columna3);

        var columna4 = document.createElement("td");
        var comensales = document.createElement("p");
        comensales.innerHTML = plato.orden;
        columna4.appendChild(comensales);
        fila.appendChild(columna4);

        var columna5 = document.createElement("td");
        var descripcion = document.createElement("p");
        descripcion.innerHTML = plato.precio;
        columna5.appendChild(descripcion);
        fila.appendChild(columna5);

        var columna6 = document.createElement("td");
        var autor = document.createElement("p");
        // autor.innerHTML = getName(resultado[i].autor);
        columna6.appendChild(autor);
        fila.appendChild(columna6);

        filas.appendChild(fila);
    })
}

function registrarPlato() {
    let plato = crearPlato()
    let id = document.getElementById("_id").value
    if (id) {
        fetch("https://restaurante.serverred.es/api/platos/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(plato)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error == null) {
                // alert("plato modificada correctamente") 
                main()
            } else {
                error2(document.getElementById("nombre"), data.error)
            }
        })
        .catch(error => {
            console.log(error);
        })
    } else {
        fetch("https://restaurante.serverred.es/api/platos/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(plato)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error == null) {
                // alert("plato creada correctamente")
                main()
            } else {
                error2(document.getElementById("nombre"), data.error)
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

function crearPlato() {
    let plato = {
        nombre: document.getElementById("nombre").value,
        orden: document.getElementById("orden").value,
        precio: document.getElementById("precio").value
    }
    return plato
}

function borrar() {
    fetch("https://restaurante.serverred.es/api/platos/" + this.id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "auth-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error == null) {
                // alert("plato borrada correctamente")
                main();
            } else {
                error2(document.getElementById("nombre"), data.error)
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function modificarplato() {
    document.getElementById("formulario").className = ""
    document.getElementById("cancelar").addEventListener("click", () => { document.getElementById("formulario").className = "visually-hidden" })
    document.getElementById("confirmar").addEventListener("click", validar, false)
    datosPlatos.forEach(plato => {
        if (this.id == plato._id) {
            
            let selectOrden = document.getElementById("orden")
            borrarOpciones(selectOrden)
            insertarOpciones(selectOrden, plato.orden);

            document.getElementById("nombre").setAttribute("value", plato.nombre)
            document.getElementById("precio").setAttribute("value", plato.precio)
            document.getElementById("_id").setAttribute("value", plato._id)
        }
    });
}

function borrarOpciones(element){

    do {
        element.lastChild.parentNode.removeChild(element.lastChild);
    } while (element.lastChild != null);
}

function insertarOpciones(selectOrden, orden){

    ["Selecciona orden", "Primero", "Segundo", "Postre"].forEach(element => {
        let opcion = document.createElement("option")
        opcion.appendChild(document.createTextNode(element))
        opcion.setAttribute("value", element)
        if(element == "Selecciona orden"){
            opcion.setAttribute("disabled", "true")
        }
        if(orden == element){
            opcion.setAttribute("selected", "true")
        }
        selectOrden.appendChild(opcion)
    });

    
}

/* ---------------------------------  VALIDACIÓN  ---------------------------------------------------- */

function nuevoPlato() {
    document.getElementById("formulario").className = ""
    document.getElementById("cancelar").addEventListener("click", () => { document.getElementById("formulario").className = "visually-hidden" })
    document.getElementById("confirmar").addEventListener("click", validar, false)
    var formulari = document.forms[0]
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].setAttribute("value", "")
    }
    borrarOpciones(document.getElementById("orden"))
    insertarOpciones(document.getElementById("orden"), "Selecciona orden")
}

function validar(e) {
    e.preventDefault()
    esborrarError()
    if (validarNombre() && validarOrden() && validarPrecio()) {
        registrarPlato();
        return true
    } else {
        e.preventDefault()
        return false
    }
}

function validarNombre() {
    var element = document.getElementById("nombre")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce un nombre.")
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nombre no es válido.")
        }
        //error(element)
        return false
    }
    return true
}

function validarOrden() {
    var element = document.getElementById("orden")
    const expReg = new RegExp(/^(Primero)|(Segundo)|(Postre)$/);
  
    if (expReg.test(element.value)) {
        console.log("valido");
        return true
    }else{
        error2(element, "El orden no es válido.")
        return false
    }
}

function validarPrecio(){
    var element = document.getElementById("precio")
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Introduce un precio.")
        }
        if (element.validity.patternMismatch) {
            error2(element, "El precio no puede ser menor que 0.")
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
    document.getElementById("confirmar").className = "mt-2 btn btn-primary"
    document.getElementById("cancelar").className = "mt-2 btn btn-primary"
    document.getElementById("missatgeError").innerHTML = ""
}