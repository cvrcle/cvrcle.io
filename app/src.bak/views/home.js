import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import Navbar from '../components/navbar.jsx';
import {Card, Header, Icon, Image} from 'semantic-ui-react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router'

class Logout extends Component {
  constructor() {
    super();

    this.state = {
      itins: [],
      deleted: null
    }

    this.getUserItineraries = this.getUserItineraries.bind(this);
    this.deleteItinerary = this.deleteItinerary.bind(this);

    //using this fake data until redux state is ready
    this.fakeReduxStateUserId = 1;
  }

  componentDidMount() {
    this.getUserItineraries();
  }

  getUserItineraries() {
    axios.get('http://localhost:3000/itineraries')
      .then((res) => this.setState({ itins: res.data } ))
      .catch(err => console.log(err))

    // axios.get('http://localhost:3000/itineraries?ownerID='+this.fakeReduxStateUserId)
    //   .then((res) => this.setState({ itins: res.data } ))
    //   .catch(err => console.log(err))
  }

  deleteItinerary(e) {
    e.preventDefault();
    
    const id = e.target.dataset.id;
    const oid = e.target.dataset.ownerid;
    
    axios.delete(`http://localhost:3000/itineraries?id=${id}&ownerID=${oid}`)
      .then((res) => {
        console.log("deleted", res);
        this.setState({
          delete: res
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Navbar />
          <div>
            <Header as='h2' icon textAlign='center'>
              <Image shape='circular' src='./cvrcle_circle_480.png' size='small' />
              <Header.Content>
                Your Itineraries...Where shall we go?
              </Header.Content>
          </Header>
        </div>
        <div className="itin-container">
          {this.state.itins ? this.state.itins.map((itin) => (
            <Card color="teal" href={`/#/itinerary?itinID=${itin.id}`}>
              <span className="text-right glyphicon glyphicon-remove" data-id={itin.id} data-ownerid={itin.ownerID} onClick={this.deleteItinerary}></span>
              <Card.Header>{itin.itinName}</Card.Header>
              <Card.Content extra>Created: {itin.created_at.substring(0, 10)}</Card.Content>
            </Card>
          )) : ""}
        </div>
      </div>
    );
  }
}

export default Logout