function CreateTodoButton(){
    function presionado (msj) {
        alert(msj)
    }

    return(
        <button onClick={() => presionado("Hola")}>Añadir</button>
    )
}

export {CreateTodoButton}