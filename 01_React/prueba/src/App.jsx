//import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { AppUI } from './components/AppUI';

const defTodos = [
  { id: 0, text: 'cortar cebolla', completed: false },
  { id: 1, text: 'comer', completed: false },
  { id: 2, text: 'Limpiar', completed: false },
]
/* 
  React custom Hook que recibe dos parámetros a la hora de llamarlo 
  El primer parámetro será el valor que tenga el elemento que se guarda
  en el LocalStorage y el segundo valor es el valor inicial que tendrá 
  dicho elemento en caso de que no exista EJ:"useLocalStorage('nombre', '')" 
*/
function useLocalStorage(itemName, initialValue) {

  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItem)

  function saveItem(newItem) {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  };

  return [
    item,
    saveItem
  ]
}

function App() {

  const [todos, saveTodos] = useLocalStorage('TODOS_V1', defTodos)

  const [searchValue, setSearchValue] = React.useState('')

  const completedTodos = todos.filter(ele => !!ele.completed).length
  const totalTodos = todos.length

  const filtro = todos.filter(ele => ele.text.toLowerCase().includes(searchValue.toLowerCase()))

  function completarTodo(id) {
    const index = todos.findIndex(todo => todo.id === id)
    const aux = [...todos]
    //aux[index].completed = true
    //const res = aux[index].completed ? "false" : "true"
    if (aux[index].completed) {
      aux[index].completed = false
    } else {
      aux[index].completed = true
    }
    saveTodos(aux)
  }

  function borrarTodo(id) {
    const index = todos.findIndex(todo => todo.id === id)
    const aux = [...todos]
    aux.splice(index, 1)
    saveTodos(aux)
  }

  return (
    <>
      <AppUI
        total={totalTodos}
        filtro={filtro}
        completed={completedTodos}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        completarTodo={completarTodo}
        borrarTodo={borrarTodo}
      />
    </>
  );
}

export default App;
