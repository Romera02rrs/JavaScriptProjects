window.onload = main
var token
var comanda
var datosPlatos

function main(){
    comprobarToken()
    obtenerComanda()
    obtenerDatosPlatos()
    document.getElementById("confirmar").addEventListener("click", actualizarComanda, false)
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
       console.error(error)
    })
}

function setImg(user) {

    let avatar = document.getElementById("avatar")
    avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ user.avatar)
}

function obtenerComanda(){
    comanda = JSON.parse(localStorage.getItem("comanda"))
}

function borrarPlatos(){
    var filas = document.getElementById("comPlatos");

    if(filas.lastChild != null){
        do{
            filas.lastChild.parentNode.removeChild(filas.lastChild);
        }while(filas.lastChild != null);   
    }
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
        datosPlatos = data.data.data
        establecerValores()
        muestraPlatos()
    })
    .catch(error => {
       console.error(error)
    })
}

function establecerValores(){
    console.log(comanda);
    console.log(datosPlatos);
    document.getElementById("nombre").appendChild(document.createTextNode(comanda.nombre))
    document.getElementById("comensales").appendChild(document.createTextNode(comanda.comensales))
    document.getElementById("camarero").appendChild(document.createTextNode(comanda.user))
    document.getElementById("fechaEntrada").appendChild(document.createTextNode(comanda.fechaEntrada))
    document.getElementById("notas").appendChild(document.createTextNode(comanda.notas))

    var platosPrimero = document.getElementById("platosPrimero");
    var platosSegundo = document.getElementById("platosSegundo");
    var platosPostre = document.getElementById("platosPostre");
    datosPlatos.forEach(plato => {

        let divEle = document.createElement("div")
        divEle.setAttribute("class", "col")

        let inputEle = document.createElement("input")
        inputEle.setAttribute("type", "button")
        inputEle.setAttribute("id", plato._id)
        inputEle.setAttribute("class", "mt-2 btn btn-info p-3")
        inputEle.setAttribute("value", plato.nombre)
        inputEle.addEventListener("click", masPlatos)

        divEle.appendChild(inputEle)

        if(plato.orden == "Primero"){
            platosPrimero.appendChild(divEle)
        }else if(plato.orden == "Segundo"){
            platosSegundo.appendChild(divEle)
        }else{
            platosPostre.appendChild(divEle)
        }
        
    });
   
}

function masPlatos(){

    for (const plato of comanda["platos"]) {
        if(this.id === plato._id){
            plato.cantidad ++
            borrarPlatos()
            muestraPlatos()
            return
        }
    }
    comanda["platos"].push(crearPlatoNuevo(this.id))
    borrarPlatos()
    muestraPlatos()
}

function crearPlatoNuevo(id){
    for (const plato of datosPlatos) {
        if(plato._id === id){
            return {
                _id: plato._id,
                cantidad: 1,
                estado: "Pendiente",
                nombre: plato.nombre,
                precio: plato.precio,
            }
        }
    }
}

function muestraPlatos(){
    console.log(comanda);
    var filas = document.getElementById("comPlatos");
    comanda["platos"].forEach(plato => {

        var fila = document.createElement("tr");

        var columna1 = document.createElement("td");
        var esborrarBtb = document.createElement("button");
        esborrarBtb.setAttribute("class", "btn btn-primary btn-lg my-3");
        esborrarBtb.setAttribute("id", plato._id);
        esborrarBtb.addEventListener("click", borrar);
        esborrarBtb.innerHTML = "Esborrar";
        columna1.appendChild(esborrarBtb);
        fila.appendChild(columna1);

        
        var columna3 = document.createElement("td");
        var numero = document.createElement("p");
        numero.innerHTML = plato.nombre;
        columna3.appendChild(numero);
        fila.appendChild(columna3);

        var columna3 = document.createElement("td");
        var orden = document.createElement("p");
        orden.innerHTML = obtenerOrden(plato._id);
        columna3.appendChild(orden);
        fila.appendChild(columna3);

        var columna4 = document.createElement("td");
        var cantidad = document.createElement("p");
        cantidad.innerHTML = plato.cantidad;
        columna4.appendChild(cantidad);
        fila.appendChild(columna4);
        
        filas.appendChild(fila);
    })
}

function obtenerOrden(id){
    const plato = datosPlatos.find(element => element._id == id)
    if(plato != undefined){
        return plato.orden
    }
    return "Sin Orden"
}

function borrar(){
    var index = -1
    for (const plato of comanda["platos"]) {
        index ++
        if(plato._id === this.id){
            comanda["platos"].splice(index, 1)
        }
    }
    borrarPlatos()
    muestraPlatos()
}

function actualizarComanda(e){
    e.preventDefault()

    let enviar ={
        platos: comanda.platos,
        notas: document.getElementById("notas").value
    }
    console.log(comanda);
    fetch("https://restaurante.serverred.es/api/comandas/platos/" + comanda._id, {
        method: "PUT",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(enviar)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error == null){
            window.location.href = "comandas.html"
        }else{
            console.log(data);
        }
    })
    .catch(error => {
        console.log(error);
    })
}