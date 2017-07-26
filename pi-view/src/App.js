import React, { Component } from 'react';
import './App.css';
import './css/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './css/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css';
import Chart from './components/chart/chart.jsx';
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
    this.totalAiWins = 0;
    this.totalUserWins = 0;
    var self = this;

    var trainingData = [{ input: { r: '1', p: '0', s: '0' }, output: { r: '0', p: '1', s: '0' } },
    { input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' } },
    { input: { r: '0', p: '0', s: '1' }, output: { r: '1', p: '0', s: '0' } }];

    socket.on('rps_view_reset', function () {
      window.console.log('Resetting training model...');
      self.totalAiWins = 0;
      self.totalUserWins = 0;
      self.setState({
        results: []
      });

      trainingData = [{ input: { r: '1', p: '0', s: '0' }, output: { r: '0', p: '1', s: '0' } },
      { input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' } },
      { input: { r: '0', p: '0', s: '1' }, output: { r: '1', p: '0', s: '0' } }];
    });

    socket.on('rps_view_play', function (userPlay) {

      var net = new brain.NeuralNetwork();

      var playElement = {};

      if (userPlay === 'rock') {
        playElement = { input: { r: '1', p: '0', s: '0' }, output: { r: '0', p: '1', s: '0' } };
      } else if (userPlay === 'paper') {
        playElement = { input: { r: '0', p: '1', s: '0' }, output: { r: '0', p: '0', s: '1' } };
      } else if (userPlay === 'scissors') {
        playElement = { input: { r: '0', p: '0', s: '1' }, output: { r: '1', p: '0', s: '0' } };
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

      // Determine who won
      var aiWon = false;
      var userWon = false;

      if ((userPlay === 'rock' && aiPlay === 'paper') ||
        (userPlay === 'paper' && aiPlay === 'scissors') ||
        (userPlay === 'scissors' && aiPlay === 'rock')) {
        aiWon = true;
        userWon = false;
        self.totalAiWins++;
        window.console.log('ai won');
        window.console.log(self.totalAiWins);
      }

      if ((aiPlay === 'rock' && userPlay === 'paper') ||
        (aiPlay === 'paper' && userPlay === 'scissors') ||
        (aiPlay === 'scissors' && userPlay === 'rock')) {
        aiWon = false;
        userWon = true;
        self.totalUserWins++;
        window.console.log('user won');
        window.console.log(self.totalAiWins);
      }

      var result = {
        playId: self.state.results.length + 1,
        userPlay: userPlay,
        aiPlay: aiPlay,
        aiWon: aiWon,
        userWon: userWon,
        totalAiWins: self.totalAiWins,
        totalUserWins: self.totalUserWins
      };

      self.setState({
        results: self.state.results.concat([result])
      });

    });
  }

  render() {
    return (
      <div className="App">
        <Chart results={this.state.results}></Chart>
        <ResultsList results={this.state.results}></ResultsList>
      </div>
    );
  }
}

export default App;
