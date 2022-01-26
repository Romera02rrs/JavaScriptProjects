window.onload = main
var token
var datosApis = new Array()
var arrColores = ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark"]

function main(){
    comprobarToken()
    obtenerDatosPlatos()
}

function comprobarToken(){
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if(tokenAux){
        token = tokenAux
        getDatosUsuario()
    }else{
        alert("Debes iniciar sesion")
        //window.location.href = "index.html"
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
        borrarError()
        document.getElementById("missatgeError").appendChild(document.createTextNode(error))
    })
}

function setImg(user) {

    let avatar = document.getElementById("avatar")
    avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ user.avatar)
}

function obtenerDatosPlatos(){
    fetch("https://restaurante.serverred.es/api/platos", {
        method: "GET",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Accept' : 'application/json',
            "auth-token": token
        }
    })
    .then(response => response.json())
    .then(data => {
        datosApis["platos"] = data.data.data
        obtenerDatosMesas()
    })
    .catch(error => {
        borrarError()
        document.getElementById("missatgeError").appendChild(error)
    })
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
        datosApis["mesas"] = data.data.data
        obtenerDatosCamareros()
    })
    .catch(error => {
        borrarError()
        document.getElementById("missatgeError").appendChild(error)
    })
}

function obtenerDatosCamareros(){
    fetch("https://restaurante.serverred.es/api/camareros", {
        method: "GET",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Accept' : 'application/json',
            "auth-token": token
        }
    })
    .then(response => response.json())
    .then(data => {
        datosApis["camareros"] = data.data.data
        obtenerDatosComandas(data.data.data)
    })
    .catch(error => {
        borrarError()
        document.getElementById("missatgeError").appendChild(error)
    })
}

function obtenerDatosComandas(){
    fetch("https://restaurante.serverred.es/api/comandas", {
        method: "GET",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Accept' : 'application/json',
            "auth-token": token
        }
    })
    .then(response => response.json())
    .then(data => {
        datosApis["comandas"] = data.data.data
        console.log(datosApis);
        pintaTablaElementos()
    })
    .catch(error => {
        borrarError()
        document.getElementById("missatgeError").appendChild(error)
    })
}

function pintaTablaElementos(){

    var color = 0
    var filas = document.getElementById("files")
    datosApis["comandas"].forEach(comanda => {
        color++
        if(color > 7){
            color = 0;
        }
        comanda.platos.forEach(plato => {
            

            if(comanda.estado == "Pendiente" && plato.estado == "Pendiente"){
                
                var fila = document.createElement("tr")
                fila.setAttribute("class", obtenerColor(color))
            
                var columna2 = document.createElement("td")
                var col2Btn = document.createElement("button")
                col2Btn.setAttribute("class", "btn btn-warning btn-lg my-3")
                col2Btn.setAttribute("id", plato._id)
                col2Btn.addEventListener("click", ()=>{servir(comanda._id, plato._id)})
                col2Btn.appendChild(document.createTextNode("Servir"))
                columna2.appendChild(col2Btn)
                fila.appendChild(columna2)
                
                var columna3 = document.createElement("td")
                var col3Ele = document.createElement("p")
                col3Ele.appendChild(document.createTextNode(obtenerMesa(comanda.mesa)))
                columna3.appendChild(col3Ele)
                fila.appendChild(columna3)
        
                var columna4 = document.createElement("td")
                var col4Ele = document.createElement("p")
                col4Ele.appendChild(document.createTextNode(plato.nombre))
                columna4.appendChild(col4Ele)
                fila.appendChild(columna4)
        
                var columna5 = document.createElement("td")
                var col5Ele = document.createElement("p")
                col5Ele.appendChild(document.createTextNode(plato.cantidad))
                columna5.appendChild(col5Ele)
                fila.appendChild(columna5)
        
                var columna6 = document.createElement("td")
                var col6Ele = document.createElement("p")
                col6Ele.appendChild(document.createTextNode(obtenerOrden(plato._id)))
                columna6.appendChild(col6Ele)
                fila.appendChild(columna6)

                var columna7 = document.createElement("td")
                var col7Ele = document.createElement("p")
                col7Ele.appendChild(document.createTextNode(obtenerCamarero(comanda.user)))
                columna7.appendChild(col7Ele)
                fila.appendChild(columna7)

                var columna8 = document.createElement("td")
                var col8Ele = document.createElement("p")
                col8Ele.appendChild(document.createTextNode(obtenerHora(comanda.fechaEntrada, comanda.fechaSalida)))
                columna8.appendChild(col8Ele)
                fila.appendChild(columna8)
        
                filas.appendChild(fila)
            }
        })
    })
}

function servir(comanda_id, plato_id){

    console.log("AA");
    var plato = {
        plato: plato_id
    }
    fetch("https://restaurante.serverred.es/api/comandas/estadoplatos/" + comanda_id, {
        method: "PUT",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(plato)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error == null){
            alert(data["sucsess"])
            borrarHijos()
            obtenerDatosPlatos()
        }else{
            console.log("Cambiar Estado: "+data)
        }
    })
    .catch(error => {
        borrarError()
        document.getElementById("missatgeError").appendChild(error)
    })
}

function borrarError(){
    var element = document.getElementById("missatgeError");

    if(element.lastChild != null){
        do{
            element.lastChild.parentNode.removeChild(element.lastChild);
        }while(element.lastChild != null);
    }
}

function borrarHijos(){
    var element = document.getElementById("files");

    if(element.lastChild != null){
        do{
            element.lastChild.parentNode.removeChild(element.lastChild);
        }while(element.lastChild != null);
    }
}

function obtenerColor(color){
    return arrColores[color]
}

function obtenerOrden(id){
    for (const plato of datosApis["platos"]) {
        if(plato._id === id){
            return plato.orden
        }
    }
    return "Sin orden"
}

function obtenerMesa(id){
    for (const mesa of datosApis["mesas"]) {
        if(mesa._id === id){
            return mesa.numero
        }
    }
    return "Sin descripción"
}

function obtenerCamarero(id){
    for (const camarero of datosApis["camareros"]){
        if(camarero._id === id){
            return camarero.name
        }
    }
    return "Sin camarero"
}

function obtenerHora(entrada, salida){

    let fecha1 = new Date(entrada)
    let fecha2 = new Date(salida)
    if(fecha2 == "Invalid Date"){
        fecha2 = new Date();
    }

    let resta = fecha2.getTime() - fecha1.getTime()

    let fecha3 = new Date(resta)
    let fechaFinal = (fecha3.getHours() + ":" + fecha3.getMinutes());

    if(fecha3 != "Invalid Date"){
        return fechaFinal
    }else{
        return "No tiene espera"
    }
}