import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import GolWrapper from './Components/GolWrapper'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <GolWrapper />
      </div>
    )
  }
}

export default App;


/*
export class  extends Component {
  constructor (props) {
    super(props)

  }

  render(){
    return (
      <div>

      </div>
    )
  }
}
*/

/*
return (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);
*/
