import React, { Component } from "react";
import Estado from "./Estado"

class Task extends Component {

    establecerEstilos() {

        return this.props.tarea.done ? "card bg-success" : "card bg-warning"
    }

    render() {
        const { tarea } = this.props


        return (
            <div className="col-12 col-sm-6 col-md-3 col-lg-2 p-2" >
                <div className={this.establecerEstilos() + " overflow-hidden"} key={tarea.id} style={{ height: '100%' }}>
                    <div className="card-body">
                        <h5 className="card-title">{tarea.title}</h5>
                        <h6 className="card-subtitle mb-2">id - {tarea.id}</h6>
                        <p className="card-text">{tarea.description}</p>
                    </div>
                    <div className='card-footer'>
                        <Estado tarea={tarea} />
                        <h6 className="card-subtitle mb-2 text-muted">{tarea.done}</h6>
                    </div>
                </div>
            </div>

        )
    }
}

export default Task;