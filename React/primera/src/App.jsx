import logo from './logo.svg';
import React from 'react';
import './App.css';
import PropTypes from 'prop-types'; // ES6

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

  static defaultProps = {
    title: 'Default title',
    version: 0
  }

  render(){
    const title = this.props.title; 
    const tech = this.props.tech;
    const version = this.props.version; 
    return(
      <div>
        <h1>{title}</h1>
        <h2>{tech[0]}</h2>
        <h3>{version}</h3>
      </div>
  )
  }

  // render(){
  //   let h1class = {
  //     textAlign: 'center',
  //     color: 'red',
  //     fontWeight: 'bold'
  //   }

  //   let h2class = {
  //     textAlign :  'center',
  //     color: 'darkred'
  //   }

  //   return (
  //     <div>
  //       <h1 style={h1class}>Styled component</h1>
  //       <h2 style={h2class}>Second styled component</h2>
  //     </div>
  //   )
  // }
}

App.propTypes = {
  title: this.propTypes.string.isRequired,
  version: this.propTypes.number.isRequired
}

export default App;
