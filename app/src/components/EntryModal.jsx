import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GOOGLE_API_KEY from '../../../config.js';
// import rootReducer from '../reducers/reducers_index';



const qs = require('qs');

class EntryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      formTitle: "",
      formAuthor: "",
      formBody: "",
      address: '',
    }
    // function binds
    this.close = this.close.bind(this);
    this.handleInputchange = this.handleInputchange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  close() {
    this.setState({showModal: false}, () => {
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

  handleFormSubmit = (event) => {
    event.preventDefault()
    const { address } = { address: this.state.address }

    geocodeByAddress(address,  (err, { lat, lng }) => {
      if (err) { console.log('Error', err) } 
        console.log(`The longitutde and latitude for ${address}`, { lat, lng })
      
      const key = GOOGLE_API_KEY
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
      
      //axios call to google maps api with lat and lng
      axios
        .get(url)
        .then((response) => {
          // formatting object that gets sent to the database + gets updated to app state
          let locationToDatabase = { 
            title: this.state.formTitle,
            body: this.state.formBody,
            lat: lat,
            lng: lng,
            name: address,
            address: response.data.results[0].formatted_address,
            contributorID: 1,
            itinID: 1
          };

          console.log('location to database', locationToDatabase)

          // TODO: Find contributor name from contributorID in join table
          // console.log('location', location);
          axios
            .post('http://localhost:3000/entries', qs.stringify(locationToDatabase))
            .then((response) => {
              console.log(response)
              // this.props.updateLocations(locationToDatabase)
              this.props.newEntryAdded(locationToDatabase);
            })
            .catch((err) => {
              console.log('error1')
              if (err) {console.log(err)}
            })
        })
        .catch((err) => {
          console.log('error2')
          if (err) {console.log(err)}
        })
    })
    this.close();
  }

  render() {
    // cssClasses and myStyles is req'd for styling location search bar
    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }
    const myStyles = {
      input: { width: '100%' },
      autocompleteContainer: { backgroundColor: 'green' },
      autocompleteItem: { color: 'black' },
      autocompleteItemActive: { color: 'blue' }
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div>
        <strong>{ formattedSuggestion.mainText }</strong>{' '}
        <small>{ formattedSuggestion.secondaryText }</small>
      </div>
    )

    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>Add New Activity</Modal.Header>
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
            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.onChange}
                autocompleteItem={AutocompleteItem}
                classNames={cssClasses}
                styles={myStyles}
                placeholder={"Search Places..."}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl 
                name="formBody" 
                onChange={this.handleInputchange} 
                componentClass="textarea" 
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            className="btn btn-primary" 
            onClick={this.handleFormSubmit}
          >Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EntryModal;

// const mapStateToProps = (state) => {
//   return {
//     storeLocations: state.storeLocations
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     updateLocations: updateLocations
//   }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EntryModal);



