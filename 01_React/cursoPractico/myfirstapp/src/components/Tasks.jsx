import React, { Component } from "react";
import Task from './Task'

class Tasks extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row m-0 p-0 d-flex flex-wrap"  >
                    {this.props.tareas.map(e =>
                        <Task key={e.id} tarea={e} />
                    )}
                </div>
            </div>
        )
    }
}


export default Tasks