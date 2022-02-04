import React, {Component} from "react";

class Estado extends Component {
    render(){

        const {tarea} = this.props
        console.log(tarea);

        return(
            <div>
                <label for=""></label>
                <input type="checkbox" id={tarea.id} />
            </div>
        )
    }
}

export default Estado