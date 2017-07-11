import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './rps/rps.jsx';
import About from './about/aboutPage.jsx';

class App extends Component {
  render() {
    var Child;

    switch(this.props.route) {
      case 'about' : Child = About; break;
      default : Child = Home;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Child></Child>
      </div>
    );
  }
}

export default App;
