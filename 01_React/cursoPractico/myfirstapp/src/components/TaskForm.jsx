import React, { Component } from "react";

export default class TaskForm extends Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3 col-lg-2 p-2">
                        <form action="">
                            <div className="bg-primary p-2 rounded">
                                <div className="mb-3">
                                    <label htmlFor="titleTask" className="form-label">Título de la tarea</label>
                                    <input type="text" className="form-control" id="titleTask" placeholder="Tarea número X" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descTask" className="form-label">Descripción de la tarea</label>
                                    <textarea className="form-control" id="descTask" rows="3" placeholder="Esta es la X tarea pendiente..."></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}