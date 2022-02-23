window.onload = main
var token
var datosApi

function main() {
    comprobarToken()
    borrarHijos()
    obtenerDatosApis()
}

function comprobarToken() {
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if (tokenAux) {
        token = tokenAux
        getDatosUsuario()
    }
}

function borrarHijos() {
    var element = document.getElementById("contenido")

    if (element.lastChild != null) {
        do {
            element.lastChild.parentNode.removeChild(element.lastChild)
        } while (element.lastChild != null)
    }
}

function getDatosUsuario() {
    fetch("https://news.serverred.es/api/areapersonal", {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setNombre(data.data.user);
        })
        .catch(error => {
            console.error(error);
        })
}

function setNombre(user) {
    let nomEle = document.getElementById("nom")
    nomEle.replaceChildren("Bienvenido " + user.name)
}

function obtenerDatosApis() {
    fetch("https://news.serverred.es/api/articles")
        .then(response => response.json())
        .then(data => {
            console.log(data.resultado)
            datosApi = data.resultado
            mostrarNoticias()
        })
        .catch(error => console.log(error))
}

function mostrarNoticias() {

    datosApi = datosApi.reverse();

    var contenido = document.getElementById("contenido")
    datosApi.forEach(element => {

        if (!element.deleted) {

            var card = document.createElement("div")
            card.setAttribute("class", "card mb-2")
            card.setAttribute("style", "width: 40rem;")

            var cardBody = document.createElement("div")
            cardBody.setAttribute("class", "card-body")

            var h5 = document.createElement("h5")
            h5.setAttribute("class", "card-title")
            h5.appendChild(document.createTextNode(element.title))

            var p = document.createElement("p")
            p.setAttribute("class", "card-text")
            p.appendChild(document.createTextNode(element.body))

            cardBody.appendChild(h5)
            cardBody.appendChild(p)

            var cardBody2 = document.createElement("div")
            cardBody2.setAttribute("class", "card-body")

            var span1 = document.createElement("span")
            var i1 = document.createElement("i")
            i1.setAttribute("class", "bi bi-star-fill")
            span1.appendChild(i1)
            span1.appendChild(document.createTextNode(element.voteScore))
            span1.appendChild(document.createTextNode(" "))

            var span2 = document.createElement("span")
            var i2 = document.createElement("i")
            i2.setAttribute("class", "bi bi-tag")
            span2.appendChild(i2)
            span2.appendChild(document.createTextNode(element.category))
            span2.appendChild(document.createTextNode(" "))

            var span3 = document.createElement("span")
            var i3 = document.createElement("i")
            i3.setAttribute("class", "bi bi-person-fill")
            span3.appendChild(i3)
            span3.appendChild(document.createTextNode(element.author))
            span3.appendChild(document.createTextNode(" "))

            var span4 = document.createElement("span")
            var i4 = document.createElement("i")
            i4.setAttribute("class", "bi bi-calendar-event")
            span4.appendChild(i4)
            span4.appendChild(document.createTextNode(fecha(element.timestamp)))
            span4.appendChild(document.createTextNode(" "))

            var a1 = document.createElement("a")
            a1.setAttribute("href", "#")
            a1.setAttribute("class", "text-decoration-none")
            a1.addEventListener("click", () => votar(element._id, 1))
            var ia1 = document.createElement("i")
            ia1.setAttribute("class", "bi bi-emoji-smile")
            a1.appendChild(ia1)
            a1.appendChild(document.createTextNode(" "))

            var a2 = document.createElement("a")
            a2.setAttribute("href", "#")
            a2.setAttribute("class", "text-decoration-none")
            a2.addEventListener("click", () => votar(element._id, 2))
            var ia2 = document.createElement("i")
            ia2.setAttribute("class", "bi bi-emoji-angry")
            a2.appendChild(ia2)
            a2.appendChild(document.createTextNode(" "))

            var a3 = document.createElement("a")
            a3.setAttribute("href", "#")
            a3.setAttribute("class", "text-decoration-none")
            a3.addEventListener("click", () => borrar(element._id))
            var ia3 = document.createElement("i")
            ia3.setAttribute("class", "bi bi-trash")
            a3.appendChild(ia3)
            a3.appendChild(document.createTextNode("Eliminar"))

            cardBody2.appendChild(span1)
            cardBody2.appendChild(span2)
            cardBody2.appendChild(span3)
            cardBody2.appendChild(span4)
            cardBody2.appendChild(a1)
            cardBody2.appendChild(a2)
            cardBody2.appendChild(a3)

            card.appendChild(cardBody)
            card.appendChild(cardBody2)

            contenido.appendChild(card)

        }
    })

}

function fecha(date) {
    let fecha = new Date(date)
    return fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + 
    ", " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
}

function borrar(id) {
    fetch("https://news.serverred.es/api/articles/" + id, {
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
            main()
        })
        .catch(error => {
            console.log(error)
        })
}

function votar(id, num) {

    if (num == 1) {
        vote = {
            vote: "upVote"
        }
    } else {
        vote = {
            vote: "downVote"
        }
    }

    fetch("https://news.serverred.es/api/articles/" + id, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(vote)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            main()
        })
        .catch(error => {
            console.log(error)
        })
}