import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      value: null,
    };
  }

  handleClick() {    
    var data = {
       "Inputs": {
                "input1":
                [
                    { 'time': "1", 'data': "1" },
                    { 'time': "2", 'data': "3" },
                    { 'time': "3", 'data': "2" },
                    { 'time': "4", 'data': "1" },
                ],
        },
      "GlobalParameters":  { }
    };

    $.ajax({
      url: 'https://ussouthcentral.services.azureml.net/subscriptions/2dd028f929f044e0afa8f1feb12a5062/services/cf5785b34acd4e95be683c74d582c2da/execute?api-version=2.0&format=swagger',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      cache: false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'bearer tdYLRk++vz3TQgwXu8r9muGnpz4y6GA2iTiQPtAgaekhOljDYDlDb+Y/PXdNlG44ZJetCSl/Gee39Z2dH+g9TQ==');
      },
      data: JSON.stringify(data),
      success: function(data) {
            this.setState({ data: data }); // Notice this
          }.bind(this),
      error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <p className="App-intro">
          
          <button onClick={() => this.handleClick()}>Submit</button>
        </p>
      </div>
    );
  }  
}

export default App;
