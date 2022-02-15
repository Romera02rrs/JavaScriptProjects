import './App.css';
import React, { Component } from 'react';

import tasks from './sample/task.json'

// Components
import Tasks from './components/Tasks'
import TaskForm from './components/TaskForm'

class App extends Component {

  state = {
    tareas: tasks
  }

  render() {
    return (
      <>
        <Tasks tareas={this.state.tareas} />
        <TaskForm />
      </>
    )
  }
}

export default App;
