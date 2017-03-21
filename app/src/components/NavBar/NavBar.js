import React, { Component } from 'react';
import { Navbar, NavbarHeader, Nav } from 'react-bootstrap';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router'

const NavBar = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
<div>
  <Navbar>
    <Navbar.Header>
        <Link to='/home'>
          <Image className="cvrcle-logo-icon" src='http://i.imgur.com/Br8tEA9.png' />
        </Link>
    </Navbar.Header>
    <Nav>
      { !isAuthenticated ? (
        <button onClick={onLoginClick} className="navbar-links">Login</button>
      ) : (
          <button onClick={onLogoutClick} className="navbar-links">Logout</button>
      )}
    </Nav>
  </Navbar>
  </div>
    // <Nav><li><Link to="/logout">Logout</Link></li></Nav>


  // <div>
  //   { error &&
  //     <p>{error}</p>
  //   }
  // </div>

NavBar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  profile: React.PropTypes.object,
  error: React.PropTypes.string,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

export default NavBar
