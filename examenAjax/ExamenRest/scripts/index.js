window.onload = main
var token

function main(){
    comprobarToken()
}

function comprobarToken(){
    let tokenAux = JSON.parse(localStorage.getItem("token"))
    if(tokenAux){
        token = tokenAux
        getDatosUsuario()
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
        setNombre(data.data.user);
        setImg(data.data.user)
    })
    .catch(error => {
       console.error(error);
    })
}

function setNombre(user){
    let nomEle = document.getElementById("nom")
    nomEle.replaceChildren("Bienvenido " + user.name)
}

function setImg(user) {

    let avatar = document.getElementById("avatar");

    avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ user.avatar);
}