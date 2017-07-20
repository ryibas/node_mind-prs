import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './css/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css';
import Home from './components/rps/rps.jsx';
import About from './components/about/aboutPage.jsx';
import io from 'socket.io-client';
import brain from 'brain.js';

class App extends Component {
  constructor(props) {
    super(props);

    var socket = io('http://localhost:3001');
    socket.on('rps_play', function (play) {
      window.console.log(play);

      var net = new brain.NeuralNetwork();

      net.train([{input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' }},
           {input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' }},
           {input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' }},
           {input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' }},
           {input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' }},
           {input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' }}]);            

      var output = net.run({  r: '0', p: '1', s: '0' });

      window.console.log(output);

      if (output.r > output.p && output.r > output.s) {
        window.console.log('r');
      }

      if (output.p > output.r && output.p > output.s) {
        window.console.log('p');        
      }

      if (output.s > output.r && output.s > output.p) {
        window.console.log('s');
      }
      
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
