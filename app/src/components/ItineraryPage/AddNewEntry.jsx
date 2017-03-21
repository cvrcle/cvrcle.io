import React, { Component } from 'react';
import EntryModal from './EntryModal.jsx';
import { Button }  from 'react-bootstrap';

// add new entry Button

class AddNewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
  }

  // default state is closed modal
  toggleModal() {
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  // gets user input from child component 'EntryModal' and sets it in component state
  updateEntry(title, body) {
    this.setState({
      title: title,
      body: body
    })
  }

  render() {
    return (
      <span>
        {this.state.isClicked ? 
          <EntryModal 
            resetFlag={this.toggleModal} 
            updateEntry={this.updateEntry}
            newEntryAdded={this.props.newEntryAdded}
          /> : ""}
        <Button 
          id={this.state.id} 
          bsStyle="default"
          className="entry btn-primary"
          onClick={this.toggleModal}>Add New Entry
        </Button>
      </span>
    );
  }
}

export default AddNewEntry;

