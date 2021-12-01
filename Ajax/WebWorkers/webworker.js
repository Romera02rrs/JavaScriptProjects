var worker = new Worker("worker.js");

worker.addEventListener("message", function(e){
    alert("El trabajador dice: "+e.data);
});

worker.postMessage("Que hora es?");