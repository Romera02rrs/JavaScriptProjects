window.onload = main
var token
var datosApis = new Array()

function main(){
    comprobarToken()
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
        borrarError()
        document.getElementById("missatgeError").appendChild(document.createTextNode(error))
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
        datosApis["mesas"] = data.data.data
        obtenerDatosCamareros()
    })
    .catch(error => {
        borrarError()
        document.getElementById("missatgeError").appendChild(document.createTextNode(error))
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
        document.getElementById("missatgeError").appendChild(document.createTextNode(error))
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
        muestraComandas()
    })
    .catch(error => {
        borrarError()
        document.getElementById("missatgeError").appendChild(document.createTextNode(error))
    })
}

function muestraComandas(){
    
    console.log(datosApis["mesas"]);
    console.log(datosApis["camareros"]);
    console.log(datosApis["comandas"]);

    var filas = document.getElementById("files");
    datosApis["comandas"].forEach(comanda => {

        var fila = document.createElement("tr");
        if(comanda.estado == "Servido"){
            fila.setAttribute("class", "table-success")
        }else{
            fila.setAttribute("class", "table-secondary")

        }

        var columna1 = document.createElement("td");
        var nuevaBebida = document.createElement("button");
        nuevaBebida.setAttribute("class", "btn btn-danger btn-lg p-2");
        nuevaBebida.setAttribute("id", comanda._id);
        nuevaBebida.addEventListener("click", ()=>cerrar(comanda._id, comanda));
        nuevaBebida.appendChild(document.createTextNode("Cerrar"));
        columna1.appendChild(nuevaBebida);
        var nuevoPlato = document.createElement("button");
        nuevoPlato.setAttribute("class", "btn btn-primary btn-lg m-2 p-2");
        nuevoPlato.setAttribute("id", comanda._id);
        nuevoPlato.addEventListener("click", ()=>ticket(comanda));
        nuevoPlato.appendChild(document.createTextNode("Ticket"));
        columna1.appendChild(nuevoPlato);
        fila.appendChild(columna1);
        
        var columna3 = document.createElement("td");
        var nombre = document.createElement("p");
        nombre.appendChild(document.createTextNode(comanda.nombre));
        columna3.appendChild(nombre);
        fila.appendChild(columna3);

        var columna4 = document.createElement("td");
        var mesa = document.createElement("p");
        mesa.appendChild(document.createTextNode(obtenerMesa(comanda.mesa)));
        columna4.appendChild(mesa);
        fila.appendChild(columna4);

        var columna5 = document.createElement("td");
        var comensales = document.createElement("p");
        comensales.appendChild(document.createTextNode(comanda.comensales));
        columna5.appendChild(comensales);
        fila.appendChild(columna5);

        var columna6 = document.createElement("td");
        var estado = document.createElement("p");
        estado.appendChild(document.createTextNode(comanda.estado));
        columna6.appendChild(estado);
        fila.appendChild(columna6);
        
        var columna6 = document.createElement("td");
        var camarero = document.createElement("p");
        camarero.appendChild(document.createTextNode(obtenerCamarero(comanda.user)));
        columna6.appendChild(camarero);
        fila.appendChild(columna6);

        var columna7 = document.createElement("td");
        var hora = document.createElement("p");
        hora.appendChild(document.createTextNode(obtenerHora(comanda.fechaEntrada)));
        columna7.appendChild(hora);
        fila.appendChild(columna7);

        filas.appendChild(fila);
    })
}

function cerrar(id, comanda){
    
    $('#myModal').modal('show');
    document.getElementById("anular").addEventListener("click", ()=>{$('#myModal').modal('hide');})
    document.getElementById("cerrarX").addEventListener("click", ()=>{$('#myModal').modal('hide');})
    document.getElementById("confirmar").addEventListener("click", ()=>{fecthCerrar(id, comanda), $('#myModal').modal('hide')})

    document.getElementById("nombre").appendChild(document.createTextNode("Nombre: " + comanda.nombre))
    document.getElementById("mesa").appendChild(document.createTextNode("Comensales: " + comanda.comensales))
    document.getElementById("camarero").appendChild(document.createTextNode("Camarero: " + obtenerCamarero(comanda.user)))
    document.getElementById("comensales").appendChild(document.createTextNode("Fecha Entrada: " + obtenerHora(comanda.fechaEntrada)))
}

function fecthCerrar(id, cmd){

    if(cmd.estado == "Servido"){
        borrarError()
        document.getElementById("missatgeError").appendChild(document.createTextNode("Comanda ya servida"))
        return
    }else{
        var comanda = {
            bebidas: cmd.bebidas,
            comensales: cmd.comensales,
            mesa: cmd.mesa,
            nombre: cmd.nombre,
            notas: cmd.notas,
            platos: cmd.platos,
            estado: "Servido",
            fechaSalida: new Date()
        }
        fetch("https://restaurante.serverred.es/api/comandas/" + id, {
            method: "PUT",
            headers : {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(comanda)
        })
        .then(response => response.json())
        .then(data => {
            if(data.error == null){
                borrarHijos()
                obtenerDatosMesas()
            }else{
                console.log("Cambiar Estado: "+data)
            }
        })
        .catch(error => {
            borrarError()
            document.getElementById("missatgeError").appendChild(document.createTextNode(error))
        })
    }
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

function ticket(comanda){

    comanda = cambiarComanda(comanda)
    localStorage.setItem("comanda", JSON.stringify(comanda))
    console.log(comanda);
    window.location.href = "comandasTicket.html"
}

function cambiarComanda(comanda){

    let mesa = obtenerMesa(comanda.mesa)
    let camarero = obtenerCamarero(comanda.user)
    let hora = obtenerHora(comanda.fechaEntrada)

    comanda.mesa = mesa
    comanda.user = camarero
    comanda.fechaEntrada = hora

    return comanda
}

function cambiarComanda(comanda){

    let mesa = obtenerMesa(comanda.mesa)
    let camarero = obtenerCamarero(comanda.user)
    let hora = obtenerHora(comanda.fechaEntrada)

    comanda.mesa = mesa
    comanda.user = camarero
    comanda.fechaEntrada = hora

    return comanda
}

function obtenerMesa(id){
    for (const mesa of datosApis["mesas"]) {
        if(mesa._id === id){
            return mesa.descripcion
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

function obtenerHora(hora){
    let fecha = new Date(hora)
    return fecha.getHours() + ":" + fecha.getMinutes()
}