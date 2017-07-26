import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './resultsList.css';
import React from 'react'

class ResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      defaultSortName: 'key',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };
  }

  render() {
      return (
        <div className="ResultsList">
          <BootstrapTable data={this.props.results} options={this.options}>
            <TableHeaderColumn dataField='key' isKey dataSort>Play #</TableHeaderColumn>
            <TableHeaderColumn dataField='userPlay' dataSort>User Played</TableHeaderColumn>
            <TableHeaderColumn dataField='aiPlay'>AI Played</TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }

  export default ResultsList;