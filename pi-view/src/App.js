import React, { Component } from 'react';
import './App.css';
import './css/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './css/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css';
import Home from './components/rps/rps.jsx';
import ResultsList from './components/resultsList/resultsList.jsx';
import io from 'socket.io-client';
import brain from 'brain.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };

    var socket = io('http://localhost:3001');
    var self = this;

    var trainingData = [{ input: { r: '1', p: '0', s: '0' }, output: { r: '0', p: '1', s: '0' } },
    { input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' } },
    { input: { r: '0', p: '0', s: '1' }, output: { r: '1', p: '0', s: '0' } }];

    socket.on('rps_view_reset', function() {
      window.console.log('Resetting training model...');
      trainingData = [{ input: { r: '1', p: '0', s: '0' }, output: { r: '0', p: '1', s: '0' } },
          { input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' } },
          { input: { r: '0', p: '0', s: '1' }, output: { r: '1', p: '0', s: '0' } }];
    });

    socket.on('rps_view_play', function (userPlay) {

      var net = new brain.NeuralNetwork();

      var playElement = {};

      if (userPlay === 'rock') {
        playElement = { input: { r: '1', p: '0', s: '0' }, output: { r: '0', p: '1', s: '0' }};
      } else if (userPlay === 'paper') {
        playElement = { input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1'}};
      } else if (userPlay === 'scissors') {
        playElement = { input: { r: '0', p: '0', s: '1' }, output: { r: '1', p: '0', s: '0'}};
      } else {
        return;
      }

      trainingData.push(playElement);
      net.train(trainingData);

      var output = net.run(playElement);

      window.console.log(userPlay);
      window.console.log(trainingData);
      window.console.log(output);

      var aiPlay = '';

      if (output.r > output.p && output.r > output.s) {
        aiPlay = 'rock';
        window.console.log('r');
      }

      if (output.p > output.r && output.p > output.s) {
        aiPlay = 'paper';
        window.console.log('p');
      }

      if (output.s > output.r && output.s > output.p) {
        aiPlay = 'scissors';
        window.console.log('s');
      }

      var result = {
        userPlay: userPlay,
        aiPlay: aiPlay
      };

      self.setState({ 
        results: self.state.results.concat([result])
      });

    });
  }

  render() {
    var Child;

    switch (this.props.route) {
      //case 'about': Child = About; break; // Here's where we would replace Child w/ something else
      default: Child = Home;
    }

    return (
      <div className="App">
        <div className="App-header">
        </div>
        <Child></Child>
        <ResultsList results={this.state.results}></ResultsList>
      </div>
    );
  }
}

export default App;
