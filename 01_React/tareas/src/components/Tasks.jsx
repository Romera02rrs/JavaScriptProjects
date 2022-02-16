import React, { useContext } from "react"
import { appContext, tasks } from "./contextData"

import Task from "./Task"

const Tasks = () => {
    
    const tasks = useContext(appContext)

    console.log(tasks);

        return (
            <ul>
                {tasks.map(e =>
                    <li><Task tarea={e} key={e.id}/></li>
                )}
            </ul>
        )
    
}


export default Tasks