window.onload = main
var token
var comanda
var datosBebidas

function main(){
    comprobarToken()
    obtenerComanda()
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

function borrarBebidas(){
    var filas = document.getElementById("comBebidas");

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
        datosBebidas = data.data.data
        establecerValores()
        muestraBebidas()
    })
    .catch(error => {
       console.error(error)
    })
}

function establecerValores(){
    console.log(comanda.bebidas);
    console.log(datosBebidas);
    document.getElementById("nombre").appendChild(document.createTextNode(comanda.nombre))
    document.getElementById("comensales").appendChild(document.createTextNode(comanda.comensales))
    document.getElementById("camarero").appendChild(document.createTextNode(comanda.user))
    document.getElementById("fechaEntrada").appendChild(document.createTextNode(comanda.fechaEntrada))
    document.getElementById("notas").appendChild(document.createTextNode(comanda.notas))

    var bebidas = document.getElementById("bebidas");
    datosBebidas.forEach(bebida => {

        let divEle = document.createElement("div")
        divEle.setAttribute("class", "col")

        let inputEle = document.createElement("input")
        inputEle.setAttribute("type", "button")
        inputEle.setAttribute("id", bebida._id)
        inputEle.setAttribute("class", "mt-2 btn btn-info p-3")
        inputEle.setAttribute("value", bebida.nombre)
        inputEle.addEventListener("click", masBebidas)

        divEle.appendChild(inputEle)
        bebidas.appendChild(divEle)
    });
   
}

function masBebidas(){

    for (const bebida of comanda.bebidas) {
        if(this.id === bebida._id){
            console.log(true);
            bebida.cantidad ++
            borrarBebidas()
            muestraBebidas()
            return
        }
    }
    console.log(crearBebidaNueva(this.id))
    comanda.bebidas.push(crearBebidaNueva(this.id))
    borrarBebidas()
    muestraBebidas()
}

function crearBebidaNueva(id){
    for (const bebida of datosBebidas) {
        if(bebida._id === id){
            return {
                _id: bebida._id,
                cantidad: 1,
                estado: "Pendiente",
                nombre: bebida.nombre,
                precio: bebida.precio,
            }
        }
    }
}

function muestraBebidas(){
    var filas = document.getElementById("comBebidas");
    comanda.bebidas.forEach(bebida => {

        var fila = document.createElement("tr");

        var columna1 = document.createElement("td");
        var esborrarBtb = document.createElement("button");
        esborrarBtb.setAttribute("class", "btn btn-primary btn-lg my-3");
        esborrarBtb.setAttribute("id", bebida._id);
        esborrarBtb.addEventListener("click", borrar);
        esborrarBtb.innerHTML = "Esborrar";
        columna1.appendChild(esborrarBtb);
        fila.appendChild(columna1);

        
        var columna3 = document.createElement("td");
        var numero = document.createElement("p");
        numero.innerHTML = bebida.nombre;
        columna3.appendChild(numero);
        fila.appendChild(columna3);

        var columna3 = document.createElement("td");
        var cantidad = document.createElement("p");
        cantidad.innerHTML = bebida.cantidad;
        columna3.appendChild(cantidad);
        fila.appendChild(columna3);

        var columna6 = document.createElement("td");
        fila.appendChild(columna6);
        
        filas.appendChild(fila);
    })
}

function borrar(){

}