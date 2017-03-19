import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

const Landing = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
  // componentWillMount() {
  //   this.lock = new Auth0Lock('qpfelAKW1EAzyb3RI3pk46SD0deXrJhE', 'cvrcle.auth0.com')
  //   console.log('we in here')
  // }
      <div>
        <Image className="cvrcle-logo" src='../cvrcle.png' />
        <div className="text-center">
          Hi Regina
        </div>
         { !isAuthenticated ? (
      <button onClick={onLoginClick}>Login</button>
    ) : (
        <button onClick={onLogoutClick}>Logout</button>
    )}
      </div>

Landing.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  profile: React.PropTypes.object,
  error: React.PropTypes.string,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

export default Landing