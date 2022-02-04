import React, { Component } from "react";
import Estado from "./estado"

class Task extends Component {
    render() {
        const {tarea} = this.props
        return (
            <div className="card" style={{ width: 18 + 'rem' }} key={tarea.id}>
                <div className="card-body">
                    <h5 className="card-title">{tarea.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{tarea.id}</h6>
                    <p className="card-text">{tarea.description}</p>
                </div>
                <div className='card-footer'>
                    <Estado tarea={tarea}/>
                    <h6 className="card-subtitle mb-2 text-muted">{tarea.done}</h6>
                </div>
            </div>
        )
    }
}

export default Task;