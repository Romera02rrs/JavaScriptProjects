function getVoto(int){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState==4 && this.status==200){
            document.getElementById("encuesta").innerHTML= this.responseText;
            console.log(this.responseText);
        }
    }
    xmlhttp.open("GET","enquesta_vot.php?voto=" + int,true);
    xmlhttp.send();
    }