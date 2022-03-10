import { TodoCounter } from './TodoCounter'
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { CreateTodoButton } from './CreateTodoButton';
import { TodoItem } from './TodoItem';

function AppUI({totalTodos, filtro, completedTodos, searchValue, setSearchValue, completarTodo, borrarTodo}) {
    return (
        <>
            <TodoCounter total={totalTodos} completed={completedTodos} />
            <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
            <TodoList>
                {filtro.map(todo => (
                    <TodoItem
                        texto={todo.text}
                        key={todo.id}
                        done={todo.completed}
                        onCompletarTodo={() => completarTodo(todo.id)}
                        onDeleteTodo={() => borrarTodo(todo.id)}
                    />
                ))}
            </TodoList>
            <CreateTodoButton />
        </>
    )
}

export { AppUI }