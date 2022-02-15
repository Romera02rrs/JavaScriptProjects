import React, {Component} from "react";

class Estado extends Component {
    render(){

        const {tarea} = this.props

        return(
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id={tarea.id} onClick={
                    ()=>tarea.done = true
                    }/>
                <label className="form-check-label" htmlFor={tarea.id}>Finalizar tarea</label>
          </div>
        )
    }
}

function cambiarEstado(id){

}

export default Estado