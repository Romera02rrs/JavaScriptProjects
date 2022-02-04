import './App.css';
import React, { Component } from 'react';

import tasks from './sample/task.json'
import Tasks from './components/tasks'

class App extends Component {

  state = {
    tareas: tasks
  }

  render() {
    return (
      <Tasks tareas={this.state.tareas} />
    )
  }
}

export default App;
