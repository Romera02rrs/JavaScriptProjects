
const Task = () => {


    const { tarea } = this.props
    console.log(tarea);
    return (
        <>
            <input type="checkbox" value={tarea.title} key={tarea.id}/>
        </>

    )
}

export default Task;