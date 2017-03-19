import React, { Component } from 'react';
import { Navbar, NavbarHeader, Nav } from 'react-bootstrap';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router'

const Navb = () => (
  <Navbar>
    <Navbar.Header>
        <Link to='/home'>
          <Image className="cvrcle-logo-icon" src='../cvrcle-logo-icon.png' />
        </Link>
    </Navbar.Header>
    <Nav><li><Link to="/logout">Logout</Link></li></Nav>
  </Navbar>
)

export default Navb;