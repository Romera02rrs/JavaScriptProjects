import logo from './logo.svg';
import React from 'react';
import './App.css';

// class App extends React.Component {
//   render(){
//     return(
//       <div>
//           <h1>Hola</h1>
//       </div>
//     )
//   }
// }

// class App extends React.Component {
//   arrowHandleClick = (e) => {
//     e.preventDefault()
//     alert("The first link was clicked")
//   }
//   handleClick(e) {
//     e.preventDefault()
//     alert("The second link was clicked")
//   }
//   render(){
//     return (
//       <div className='m-5'>
//         <button className="btn btn-primary m-2" onClick={() => alert("Its works")}>
//           Click on this button
//         </button>
//         <a href="#" className='m-2' onClick={this.arrowHandleClick}>
//           Click first link
//         </a>
//         <a href="#" className='m-2' onClick={this.handleClick}>
//           Click second link
//         </a>
//       </div>
//     )
//   }
// }

class App extends React.Component {
  render(){
    let h1class = {
      textAlign: 'center',
      color: 'red',
      fontWeight: 'bold'
    }

    let h2class = {
      textAlign :  'center',
      color: 'darkred'
    }

    return (
      <div>
        <h1 style={h1class}>Styled component</h1>
        <h2 style={h2class}>Second styled component</h2>
      </div>
    )
  }
}

export default App;
