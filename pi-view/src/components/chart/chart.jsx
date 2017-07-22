import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React, { Component } from 'react';

class Chart extends Component {
    render() {
        return (
            <LineChart width={600} height={300} data={this.props.results}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="playId" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalAiWins" stroke="red" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="totalUserWins" stroke="blue" />
            </LineChart>
        );
    }
}

export default Chart;