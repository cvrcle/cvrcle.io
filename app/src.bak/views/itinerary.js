import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { Container, Header, Card, Message, Segment, Form } from 'semantic-ui-react';
import ContributorEntry from '../components/ContributorEntry.jsx';
import GoogleMap from '../components/map.jsx';
import AddNewEntry from '../components/AddNewEntry.jsx';
import Navbar from '../components/navbar.jsx';
import rootReducer from '../reducers/reducers_index';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../store.js';
import { updateLocations } from '../actions/actions_index';

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      newEntry: false
    };

    this.newEntryAdded = this.newEntryAdded.bind(this);
    this.getUserEntries = this.getUserEntries.bind(this);
    this.getQueryParams = this.getQueryParams.bind(this);

    this.itinID = this.getQueryParams('itinID');
  }

  getQueryParams(param) {
    var query = window.location.hash.substring(1);
    var vars = query.split("?");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == param){return pair[1];}
    }
    return(false);
  }

  getUserEntries() {
    axios.get('http://localhost:3000/entries?itinID='+this.itinID)
      .then((res) => {
        let filteredEntries = [];
        res.data.forEach((entry) => {
          filteredEntries.push(entry);
        })
        return filteredEntries
      })
      .then((data) => {
        this.setState({ entries: data })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillMount() {
    this.getUserEntries();
  }

  newEntryAdded(newLocation) {
    console.log('inside of add new entry');
    let tmp = this.state.entries
    tmp.push(newLocation)
    // debugger;
    this.setState({
      entries: tmp
    })

    let center = {
      lat: newLocation.lat,
      lng: newLocation.lng
    }
    return new google.maps.Marker({
      position: center,
      map: window.map
    })
    window.markerBounds.extend(center)

    console.log('google maps?!', window.google.maps);
  }

            // <AddNewEntry className="add-entry" data={''} newEntryAdded={this.newEntryAdded} />
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="map-view">
            <AddNewEntry className="add-entry" data={''} newEntryAdded={this.newEntryAdded} />
            {this.state.entries.length ? <GoogleMap locations={this.state.entries} /> : ''}
          </div>
          <div className="entries">
            <div>
              <Card.Group className="existing-entries">
                {this.state.entries.length ?
                  (this.state.entries.map((entryData, i) => (
                    <ContributorEntry key={i} {...entryData} />))) :
                  <div className="text-center">No entries yet!</div>
                }
              </Card.Group>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storeLocations: state.storeLocations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateLocations: updateLocations
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

