import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { Card, Image } from 'semantic-ui-react';
import { Col, Grid, Row } from 'react-bootstrap';
import AuthLock from './components/AuthLock.jsx'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Home from './views/home.js';
import Itinerary from './views/itinerary.js';
import Logout from './views/logout.js';
import { Provider } from 'react-redux';
import store from './store.js';
import { Parallax, Background } from 'react-parallax';
import Navbar from './components/Navbar.jsx';

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.lock = new Auth0Lock('qpfelAKW1EAzyb3RI3pk46SD0deXrJhE', 'cvrcle.auth0.com')
    console.log('we in here')
  }

  render() {
    return (
      <div>
        <Navbar />
        <Parallax className="parallax-bg-image" bgImage="./images/25806094933_c023fe0036_h.jpg" strength={600}>
          <div style={
            {
              width: 800,
              height: 300
            }}>
            <div className="parallax-content1">
              <h3 style={{
                fontWeight: 300,
                fontSize: 50
              }}>What's Your Next Adventure?</h3>
            </div>
          </div>
        </Parallax>
        <div className="container" style={{
          marginTop: 40,
          marginBottom: 80
        }}>
          <div style={
            {
              textAlign: 'center',
              marginTop: 2,
              marginBottom: 40
            }}>
            <h3>With cvrcle, make your circles come full circle. Allow the people who know you best help you plan your getaway. </h3>
          </div>
          <div style={
            {
              textAlign: 'center',
              marginTop: 2,
              marginBottom: 40
            }}>
            <h4>How it works:</h4>
          </div>
          <Grid>
            <Row>
              <Col xs={6} md={4}>
                <div style={
                  {
                    textAlign: 'center',
                  }}>
                  <h3 style={{
                    fontWeight: 200
                  }}>Step 1</h3>
                  <h4>Invite people you trust to share their insider knowledge and collaborate on your itinerary</h4>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div style={
                  {
                    textAlign: 'center'
                  }}>
                  <h3 style={{
                    fontWeight: 200
                  }}>Step 2</h3>
                  <h4>From the Eiffel Tower to the Great Wall of China, search for locations all over the world.</h4>
                </div>
              </Col>
              <Col xsHidden md={4}>
                <div style={
                  {
                    textAlign: 'center'
                  }}>
                  <h3 style={{
                    fontWeight: 200
                  }}>Step 3</h3>
                  <h4>Pack your bags and enjoy!</h4>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <Parallax className="parallax-bg-image2" bgImage="./images/21689775811_446ed525c0_k.jpg" strength={600}>
          <Col xs={6} md={4}>
            <div style={{
              width: 600,
              height: 500,
            }}></div>
          </Col>
        </Parallax>
      </div>
    );
  }
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppContainer} />
      <Route path="/home" component={Home} />
      <Route path="/itinerary" component={Itinerary} />
      <Route path="/logout" component={Logout} />
    </Router>
  </Provider>
), document.getElementById('appRoot'))
