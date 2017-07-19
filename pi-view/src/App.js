import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './css/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css';
import Home from './components/rps/rps.jsx';
import About from './components/about/aboutPage.jsx';
import io from 'socket.io-client';
import brain from './brain/browser.js';

class App extends Component {
  constructor(props) {
    super(props);

    var socket = io('http://localhost:3001');
    socket.on('rps_play', function (play) {
      window.console.log(play);

      window.console.log(brain);

      var net = new brain.NeuralNetwork();
      net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);

      var output = net.run({ r: 1, g: 0.4, b: 0 });  // { white: 0.99, black: 0.002 }

      window.console.log(output);

    });
  }

  render() {
    var Child;

    switch (this.props.route) {
      case 'about': Child = About; break;
      default: Child = Home;
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
