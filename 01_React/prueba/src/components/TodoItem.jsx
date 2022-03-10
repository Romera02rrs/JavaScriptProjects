import React from 'react'
import '../listItem.css'

const flexBetween = {
    fontFamily: 'Arial',
    color: 'blue'
}

function TodoItem(props) {

    function cambiaColor(e) {
        console.log(e);
        //e.target.style.color = encima ? "black" : 'orange'
    }

    return (
        <li className={`${props.done && 'tachado'}`} style={flexBetween}>
            <p>
                <span 
                    onClick={props.onCompletarTodo} 
                    style={{ cursor: "pointer" }}
                >
                    √
                </span> 
                &nbsp;- {props.texto} - 
                <span 
                    onClick={props.onDeleteTodo} 
                    style={{ cursor: "pointer" }}
                >
                    X
                </span>
            </p>
        </li>
    )
}


export { TodoItem }