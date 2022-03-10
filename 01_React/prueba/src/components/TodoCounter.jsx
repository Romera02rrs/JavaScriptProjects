import React from 'react'

export default function TodoCounter({total, completed}) {
    return(
        <h2>Has completado {completed} de {total}  tareas</h2>
    )
}

export { TodoCounter }