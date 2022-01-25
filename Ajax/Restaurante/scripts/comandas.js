window.onload = main
var token
var datosApis = new Array()


function main(){
    comprobarToken()
    document.getElementById("newComanda").addEventListener("click", ()=>{window.location.href = "altaComandas.html"})
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
        datosApis["mesas"] = data.data.data
        obtenerDatosCamareros()
    })
    .catch(error => {
       console.error(error)
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
       console.error(error)
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
       console.error(error)
    })
}

function muestraComandas(){
    
    console.log(datosApis["mesas"]);
    console.log(datosApis["camareros"]);
    console.log(datosApis["comandas"]);

    var filas = document.getElementById("files");
    datosApis["comandas"].forEach(comanda => {

        var fila = document.createElement("tr");

        var columna1 = document.createElement("td");
        var nuevaBebida = document.createElement("button");
        nuevaBebida.setAttribute("class", "btn btn-info btn-lg p-2");
        nuevaBebida.setAttribute("id", comanda._id);
        nuevaBebida.addEventListener("click", ()=>masBebidas(comanda));
        var iconoPlusBebidas = document.createElement("i");
        iconoPlusBebidas.setAttribute("class", "fas fa-plus");
        nuevaBebida.appendChild(iconoPlusBebidas);
        nuevaBebida.appendChild(document.createTextNode(" Bebidas"));
        columna1.appendChild(nuevaBebida);
        var nuevoPlato = document.createElement("button");
        nuevoPlato.setAttribute("class", "btn btn-warning btn-lg m-2 p-2");
        nuevoPlato.setAttribute("id", comanda._id);
        nuevoPlato.addEventListener("click", ()=>masPlatos(comanda));
        var iconoPlusPlatos = document.createElement("i");
        iconoPlusPlatos.setAttribute("class", "fas fa-plus");
        nuevoPlato.appendChild(iconoPlusPlatos);
        nuevoPlato.appendChild(document.createTextNode(" Platos"));
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

function masBebidas(comanda){
    localStorage.setItem("comanda", JSON.stringify(comanda))
    window.location.href = "comandasAddBebidas.html"
}

function masPlatos(comanda){
    localStorage.setItem("comanda", JSON.stringify(comanda))
    window.location.href = "comandasAddPlatos.html"
}

function obtenerMesa(id) {
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