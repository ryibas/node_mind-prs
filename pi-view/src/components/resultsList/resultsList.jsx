import React, { Component } from 'react'

class ResultsList extends React.Component {
  render() {
    var rows = [];
    this.props.results.forEach(function(result) {
        rows.push(<tr><td>{result.userPlay}</td><td>{result.aiPlay}</td></tr>);
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Player Play</th>
            <th>AI Play</th>
            <th>Who Won?</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default ResultsList;