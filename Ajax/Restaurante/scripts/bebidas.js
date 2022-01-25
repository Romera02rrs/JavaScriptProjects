window.onload = main
var token
var datosBebidas

function main(){
    comprobarToken()
    document.getElementById("newBebida").addEventListener("click", nuevabebida)
    borrarBebidas()
    obtenerDatosBebidas()
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

function borrarBebidas(){
    var filas = document.getElementById("files");

    do{
        filas.lastChild.parentNode.removeChild(filas.lastChild);
    }while(filas.lastChild != null);
}

function obtenerDatosBebidas(){
    fetch("https://restaurante.serverred.es/api/bebidas", {
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
        datosBebidas = data.data.data
        muestraBebidas(data.data.data)
    })
    .catch(error => {
       console.error(error)
    })
}

function muestraBebidas(resultado){
    var filas = document.getElementById("files");
    resultado.forEach(bebida => {

        var fila = document.createElement("tr");

        var columna1 = document.createElement("td");
        var esborrarBtb = document.createElement("button");
        esborrarBtb.setAttribute("class", "btn btn-primary btn-lg my-3");
        esborrarBtb.setAttribute("id", bebida._id);
        esborrarBtb.addEventListener("click", borrar);
        esborrarBtb.innerHTML = "Esborrar";
        columna1.appendChild(esborrarBtb);
        fila.appendChild(columna1);

        var columna2 = document.createElement("td");
        var ModificarBtn = document.createElement("button");
        ModificarBtn.setAttribute("class", "btn btn-primary btn-lg my-3");
        ModificarBtn.setAttribute("id", bebida._id);
        ModificarBtn.addEventListener("click", modificarbebida);
        ModificarBtn.innerHTML = "Modificar";
        columna2.appendChild(ModificarBtn);
        fila.appendChild(columna2);
        
        var columna3 = document.createElement("td");
        var numero = document.createElement("p");
        numero.innerHTML = bebida.nombre;
        columna3.appendChild(numero);
        fila.appendChild(columna3);

        var columna4 = document.createElement("td");
        var nombre = document.createElement("p");
        nombre.innerHTML = bebida.precio;
        columna4.appendChild(nombre);
        fila.appendChild(columna4);


        var columna6 = document.createElement("td");
        fila.appendChild(columna6);
        
        filas.appendChild(fila);
    })
}

function registrarbebida(){
    let bebida = crearbebida()
    let id = document.getElementById("_id").value
    if(id){
        fetch("https://restaurante.serverred.es/api/bebidas/" + id, {
        method: "PUT",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        },
            body: JSON.stringify(bebida)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.error == null){
                // alert("bebida modificada correctamente") 
                main()
            }else{
                error2(document.getElementById("numero"), data.error)
            }
        })
        .catch(error => {
            console.log(error);
        })
    }else{
        fetch("https://restaurante.serverred.es/api/bebidas/", {
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        },
            body: JSON.stringify(bebida)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.error == null){
                // alert("bebida creada correctamente")
                main()
            }else{
                error2(document.getElementById("numero"), data.error)
            }
        })
        .catch(error => {
            console.log(error);
        })
    } 
}

function crearbebida(){
    let bebida = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
    }
    return bebida
}

function borrar(){
    fetch("https://restaurante.serverred.es/api/bebidas/" + this.id, {
        method: "DELETE",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.error == null){
                // alert("bebida borrada correctamente")
                main();
            }else{
                error2(document.getElementById("numero"), data.error)
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function modificarbebida(){
    document.getElementById("formulario").className = ""
    document.getElementById("cancelar").addEventListener("click", ()=>{document.getElementById("formulario").className = "visually-hidden"})
    document.getElementById("confirmar").addEventListener("click", validar, false)
    datosBebidas.forEach(bebida => {
        if (this.id == bebida._id){
            document.getElementById("nombre").setAttribute("value", bebida.nombre)
            document.getElementById("precio").setAttribute("value", bebida.precio)
            document.getElementById("_id").setAttribute("value", bebida._id)
        }
    });
}

/* ---------------------------------  VALIDACIÓN  ---------------------------------------------------- */

function nuevabebida(){
    document.getElementById("formulario").className = ""
    document.getElementById("cancelar").addEventListener("click", ()=>{document.getElementById("formulario").className = "visually-hidden"})
    document.getElementById("confirmar").addEventListener("click", validar, false)
    var formulari = document.forms[0]
    for (var i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].setAttribute("value", "")
    }
}

function validar(e) {
    e.preventDefault()
    esborrarError()
    if (validarNombre() && validarprecio()) {
        registrarbebida();
        return true
    } else {
        e.preventDefault()
        return false
    }
}

function validarNombre(){
    var element = document.getElementById("nombre")
    if (!element.checkValidity()) {
        if (element.validity.patternMismatch) {
            error2(element, "El nombre debe contener de 4 a 60 caracteres.")
        }
        //error(element)
        return false
    }
    return true
}

function validarprecio(){
    var element = document.getElementById("precio")
    if (!element.checkValidity()) {
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