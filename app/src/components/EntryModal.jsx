import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class EntryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true
    }

    this.close = this.close.bind(this);
  }

  close() {
    this.setState({showModal: false}, () => {
      this.props.resetFlag();
    });
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>Edit Activity</Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl componentClass="input" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl componentClass="textarea" />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary">Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EntryModal;