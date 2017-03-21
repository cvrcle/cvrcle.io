import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GOOGLE_API_KEY from '../../../config.js';

class NewItinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      formTitle: "",
    }
    // function binds
    this.close = this.close.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleInputchange = this.handleInputchange.bind(this);
    this.addUserItinerary = this.addUserItinerary.bind(this);
  }

  close() {
    this.setState({ showModal: false }, () => {
      this.props.resetFlag();
    });
  }

  handleInputchange(e) {
    const name = e.target.name;
    const val = e.target.value;

    const obj = {};
    obj[name] = val;
    this.setState((prevState, props) => {
      return obj;
    });
  }

  // functions for location search bar
  onChange = (address) => {
    this.setState({ address })
  }

  addUserItinerary() {
    event.preventDefault()
    const itinData = {
      ownerID: this.props.oid.toString(),
      itinName: this.state.formTitle,
      isActive: 1,
      isPublic: 0,
    }
    axios.post('http://arcane-shore-51156.herokuapp.com/itineraries', itinData)
      .then((res) => {
        console.log("successful post", res.data.created_at);
        itinData.created_at = res.data.created_at.substring(0,10)
        this.props.newItinAdded(itinData);
      })
      .catch(err => console.log(err))
    this.close();
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>New Itinerary</Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                name="formTitle"
                onChange={this.handleInputchange}
                componentClass="input"
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary" onClick={this.addUserItinerary}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewItinModal;
