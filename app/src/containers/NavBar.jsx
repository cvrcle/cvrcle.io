import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { loginRequest, logoutSuccess } from '../actions/auth'
import { Navbar, NavbarHeader, Nav } from 'react-bootstrap';
import { Image } from 'semantic-ui-react';

// props passed down from redux store

const NavBar = ({ isAuthenticated, onLoginClick, onLogoutClick }) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Link to='/home'>
          <Image className="cvrcle-logo-icon" src='./images/cvrcle-logo-icon.png' />
        </Link>
      </Navbar.Header>
      <Nav>
        { !isAuthenticated ? 
        (<button onClick={onLoginClick} className="navbar-links">Login</button>) : 
        (<button onClick={onLogoutClick} className="navbar-links">Logout</button> )}
      </Nav>
    </Navbar>
  </div>
)

NavBar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.auth
  return {
    isAuthenticated,
    profile,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: () => {
      dispatch(loginRequest())
    },
    onLogoutClick: () => {
      dispatch(logoutSuccess())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
