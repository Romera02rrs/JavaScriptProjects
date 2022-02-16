import React, { useContext } from "react"
import { appContext, tasks } from "./contextData"

const FormTasks = () => {

    return(
        <form action="">
            <label htmlFor="newTask">Nova Taska</label><br />
            <input type="text" id="newTask" placeholder="Titulo de la nova tasca" />
            <button id="btnTask" onClick={novaTaska}>Afegir Tasca</button>
        </form>
    )
}

function novaTaska(){
    let titulo = document.getElementById("newTask").valu
    
}

export default FormTasks