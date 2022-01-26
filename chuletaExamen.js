// TODO: Fech para obtener
// Con token
fetch("https://www.serverred.es/api/", {
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
        setcol4Ele(data.data.user)
        setImg(data.data.user)
    })
    .catch(error => {
        error2(document.getElementById("nom"), error)
    })

// Sin token 
fetch("https://www.serverred.es/api/")
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => console.log(error))

// TODO: Fetch para actualizar informacion

// Con Token
fetch("https://www.serverred.es/api/" + id, {
        method: "PUT",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(datosQueHayQueActualizar)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error == null){
            window.location.href = "comandas.html"
        }else{
            console.log(data)
        }
    })
    .catch(error => {
        console.log(error)
    })

//Sin Token
fetch("https://www.serverred.es/api/" + id, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosQueHayQueActualizar)
    })
    .then(response => response.json())
    .then(data => {console.log(data); window.location.href = "llistatllibres.html"})
    .catch(error => console.log(error))

// TODO: Fetch para insertar datos

// Con token

fetch("https://www.serverred.es/api/", {
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            "auth-token": token
        },
            body: JSON.stringify(datosQueHayQueInsertar)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.error == null){
                // alert("Creado correctamente")
            }else{
                alert("ERROR")
                //error2(document.getElementById("col3Ele"), data.error)
            }
        })
        .catch(error => {
            console.log(error)
        })

// Sin token
fetch("https://www.serverred.es/api/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosQueHayQueInsertar)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error == null){
            alert("Correcto")
            // window.location.href = "llistatLlibres.html"
        }else{
            alert("ERROR")
            //error2(document.getElementById("nom"), data.error)
        }
    })
    .catch(error => {
        console.log(error)
    })

// TODO: COMPROBAR QUE UN USUARIO HAYA HECHO LOGN

var token

function main(){
    comprobarToken()
    getDatosUsuario()
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
        console.log(data)
        // funcion necesito los datos(data)
    })
    .catch(error => {
        console.log(error)
        //error2(document.getElementById("nom"), error)
    })
}

// TODO: DOM DE UNA TABLA

function pintaTablaElementos(){

    var filas = document.getElementById("files")
    recorrerArray.forEach(element => {

        var fila = document.createElement("tr")

        var columna1 = document.createElement("td")
        var col1Btn = document.createElement("button")
        col1Btn.setAttribute("class", "btn btn-primary btn-lg my-3")
        col1Btn.setAttribute("id", element._id)
        col1Btn.addEventListener("click", ()=>{console.log("Borrar")})
        col1Btn.appendChild(document.createTextNode("borrar"))
        columna1.appendChild(col1Btn)
        fila.appendChild(columna1)

        var columna2 = document.createElement("td")
        var col2Btn = document.createElement("button")
        col2Btn.setAttribute("class", "btn btn-primary btn-lg my-3")
        col2Btn.setAttribute("id", element._id)
        col2Btn.addEventListener("click", ()=>{console.log("Modificar")})
        col2Btn.appendChild(document.createTextNode("Modificar"))
        columna2.appendChild(col2Btn)
        fila.appendChild(columna2)
        
        var columna3 = document.createElement("td")
        var col3Ele = document.createElement("p")
        col3Ele.appendChild(document.createTextNode(element.PROPIEDAD))
        columna3.appendChild(col3Ele)
        fila.appendChild(columna3)

        var columna4 = document.createElement("td")
        var col4Ele = document.createElement("p")
        col4Ele.appendChild(document.createTextNode(element.PROPIEDAD))
        columna4.appendChild(col4Ele)
        fila.appendChild(columna4)

        var columna5 = document.createElement("td")
        var col5Ele = document.createElement("p")
        col5Ele.appendChild(document.createTextNode(element.PROPIEDAD))
        columna5.appendChild(col5Ele)
        fila.appendChild(columna5)

        var columna6 = document.createElement("td")
        var col6Ele = document.createElement("p")
        col6Ele.appendChild(document.createTextNode(element.PROPIEDAD))
        columna6.appendChild(col6Ele)
        fila.appendChild(columna6)

        filas.appendChild(fila)
    })
}

//TODO: Borrar todos los hijos de un nodo

function borrarHijos(){
    var element = document.getElementById("files");

    if(element.lastChild != null){
        do{
            element.lastChild.parentNode.removeChild(element.lastChild);
        }while(element.lastChild != null);
    }
}

//TODO: Actualizar tabla

function actualizarTabla(){
    borrarHijos()
    // fech que actualize el array de tablas
    pintaTablaElementos()
}
    