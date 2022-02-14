const url = "https://rickandmortyapi.com/api/character/?name=rick";

const datosApi = fetch(url).then(response => response.json())
.then(data => {
    console.log(data)
})

export default datosApi;
