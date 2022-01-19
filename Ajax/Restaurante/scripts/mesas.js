window.onload = main
var token
var datosMesas

function main(){
    comprobarToken()
    document.getElementById("newMesa").addEventListener("click", nuevaMesa)
    obtenerDatosMesas()
}

function comprobarToken(){
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if(tokenAux){
        token = tokenAux
        getDatosUsuario()
    }else{
        alert("Debes iniciar sesion")
        window.location.href = "login.html"
    }
}

function getDatosUsuario(){
    fetch("https://userprofile.serverred.es/api/areapersonal", {
        method: "GET",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Accept' : 'application/json',
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
    avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ user.avatar);
}

function obtenerDatosMesas(){
    fetch("https://restaurante.serverred.es/api/mesas", {
        method: "GET",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Accept' : 'application/json',
            "auth-token": token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.data.data)
        datosMesas = data.data.data
        muestraMesas(data.data.data)
    })
    .catch(error => {
       console.error(error)
    })
}

function muestraMesas(resultado){

    var filas = document.getElementById("files");

    resultado.forEach(mesa => {

        var fila = document.createElement("tr");

        var columna1 = document.createElement("td");
        var esborrarBtb = document.createElement("button");
        esborrarBtb.setAttribute("class", "btn btn-primary btn-lg my-3");
        esborrarBtb.setAttribute("id", mesa._id);
        // esborrarBtb.addEventListener("click", borrar);
        esborrarBtb.innerHTML = "Esborrar";
        columna1.appendChild(esborrarBtb);
        fila.appendChild(columna1);

        var columna2 = document.createElement("td");
        var ModificarBtn = document.createElement("button");
        ModificarBtn.setAttribute("class", "btn btn-primary btn-lg my-3");
        ModificarBtn.setAttribute("id", mesa._id);
        // ModificarBtn.addEventListener("click", modificarLibro);
        ModificarBtn.innerHTML = "Modificar";
        columna2.appendChild(ModificarBtn);
        fila.appendChild(columna2);
        
        var columna3 = document.createElement("td");
        var numero = document.createElement("p");
        numero.innerHTML = mesa.numero;
        columna3.appendChild(numero);
        fila.appendChild(columna3);

        var columna4 = document.createElement("td");
        var comensales = document.createElement("p");
        comensales.innerHTML = mesa.comensales;
        columna4.appendChild(comensales);
        fila.appendChild(columna4);

        var columna5 = document.createElement("td");
        var descripcion = document.createElement("p");
        descripcion.innerHTML = mesa.descripcion;
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

function registrarMesa(){
    let mesa = crearMesa()
    console.log(mesa);
    fetch("https://restaurante.serverred.es/api/mesa", {
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(mesa)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error == null){
            alert("Mesa creada correctamente")
        }else{
            error2(document.getElementById("numero"), data.error)
        }
    })
    .catch(error => {
        console.log(error);
    })
}

function crearMesa(){
    let mesa = {
        comensales: document.getElementById("comensales").value,
        descripcion: document.getElementById("descripcion").value,
        numero: document.getElementById("numero").value
    }
    return mesa
}

/* ---------------------------------  VALIDACIÓN  ---------------------------------------------------- */

function nuevaMesa(){
    document.getElementById("formulario").className = ""
    document.getElementById("cancelar").addEventListener("click", ()=>{document.getElementById("formulario").className = "visually-hidden"})
    document.getElementById("confirmar").addEventListener("click", validar, false)

    function validar(e) {
        e.preventDefault()
        esborrarError()
        if (validarNumero() && validarComensales() && validarDescripcion()) {
    
            console.log("Valido")
            registrarMesa();
            return true
    
        } else {
            e.preventDefault()
            return false
        }
    }

    function validarNumero() {
        var element = document.getElementById("numero")
        if (!element.checkValidity()) {
            if (element.validity.valueMissing) {
                error2(element, "Introduce un numero")
            }
            if (element.validity.rangeOverflow) {
                error2(element, "Máximo 100.")
            }
            if (element.validity.rangeUnderflow) {
                error2(element, "Mínimo 1.")
            }
            //error(element)
            return false
        }
        return true
    }

    function validarComensales(){
        var element = document.getElementById("comensales")
        if (!element.checkValidity()) {
            if (element.validity.valueMissing) {
                error2(element, "Introduce un numero")
            }
            if (element.validity.rangeOverflow) {
                error2(element, "Máximo 50.")
            }
            if (element.validity.rangeUnderflow) {
                error2(element, "Mínimo 1.")
            }
            //error(element)
            return false
        }
        return true
    }

    function validarDescripcion(){
        var element = document.getElementById("descripcion")
        if (!element.checkValidity()) {
            if (element.validity.patternMismatch) {
                error2(element, "La descripción debe contener solo letras.")
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
}