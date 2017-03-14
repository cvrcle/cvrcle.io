import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import { Card, Modal } from 'semantic-ui-react';
import EntryModal from './EntryModal.jsx';


class ContributorEntry extends Component {
  constructor() {
    super();

    this.state = {
      isEditing: false
    }

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  render() {
    return (
      <div>
        {this.state.isEditing ? <EntryModal resetFlag={this.toggleModal}/> : ""}
        <Card color="teal" className="entry" onClick={this.toggleModal}>
          <Card.Content>
            <Card.Header> 
              Go Skiing in Aspen!
            </Card.Header>
            <Card.Description>
              The mountains in Aspen are so beautiful. You have to go there trust me!
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span className="author">Andrew Yi</span>
            <span className="date">2/2/2017</span>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default ContributorEntry;