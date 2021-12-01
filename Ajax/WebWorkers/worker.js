self.addEventListener("message", function(e){
    console.log("The boss says ", e.data);
    hora = new Date();
    this.self.postMessage("Callate MAMAWEBBO, tu fucking hora es " + hora.getHours() + ":" + hora.getMinutes());
});