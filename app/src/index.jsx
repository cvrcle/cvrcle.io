
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import ContributorEntry from './components/ContributorEntry.jsx';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {

  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Cvrcle</h1>
        <ContributorEntry />
      </div>
    );
  }
}

ReactDOM.render(<AppContainer />, document.getElementById('appRoot'));
  