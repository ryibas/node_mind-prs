import React, { Component } from 'react';
import io from 'socket.io-client';

class Home extends Component {
    init() {
        var socket = io('http://localhost:3001');
        socket.on('chat message', function(msg) {
            window.console.log(msg);
        });
    }
    render() {
        return (
            <div className="jumbotron">
                <h1>RPS</h1>
                <p>The pain</p>
            </div>
        );
    }
}

export default Home;