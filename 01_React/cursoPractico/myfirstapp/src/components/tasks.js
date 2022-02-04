import React, { Component } from "react";
import Task from './task'

class Tasks extends Component {
    render() {
        return (
            <div style={{ "display": "flex" }}>
                {this.props.tareas.map(e =>
                    <Task key={e.id} tarea={e}/>
                )}
            </div>
        )
    }
}
export default Tasks