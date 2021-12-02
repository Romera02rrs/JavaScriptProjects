
let arrPoke = new Array;
var num = 0;
var cantidad = 10;

window.onload = main;

function main  (){
  document.addEventListener("scroll", (e)=>{
    let grandaria = document.body.scrollHeight - window.innerHeight;
    let posicion =  window.scrollY;
    //console.log(grandaria +" - "+ posicion);
    if(grandaria == posicion){
      console.log(arrPoke.length + " - " + (num+cantidad));
      if((num+cantidad) != arrPoke.length){
        num += 10;
        cargarLista();
        console.log("Cargar mas");
        return;
      }else{
        console.log("No quedan mas POKEMONS");
      }
    }
  });
// cridar al api 
fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
  .then(response => response.json())
  .then(data =>{
     //console.log ( data.results);
     arrPoke = data.results;
     //console.log(arrPoke);
     cargarLista();
  });
}

function cargarLista (){
// recorrer Array
for(let i=0;i<cantidad; i++){
  cargarPagina(arrPoke[i+num],i+num);
};
}
   

function cargarPagina (element, ind){
    fetch(element.url)
     .then(response => response.json())
     .then(data =>{
         //console.log(data);
      // Afegir dades
      document.getElementById("listado").innerHTML += '<div class="card mb-4">' +
      '<a href="#!"><img class="card-img-top" src="'+  data.sprites.front_default + '" alt="..." /></a>' +
      '<div class="card-body">' +
          '<h2 class="card-title">' + data.name +'</h2>' +
          '<div class="row">'+
              '<div class="col p-3 text-center"><strong>Peso: ' + data.weight + ' </strong></div>'+  
              '<div class="col p-3 text-center"><strong>Altura: ' +  data.height + ' </strong></div>'+      
          '</div>'+
      '</div>' +
  '</div>';
});
};