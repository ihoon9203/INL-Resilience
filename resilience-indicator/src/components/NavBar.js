import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const NavBar = function NavBarFunc() {
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  useEffect(() => {
    Axios
      .get('/api/logged_in', { withCredentials: true })
      .then((res) => {
        setLoggedInStatus(res.data.loggedIn);
      });
  });

  let loggedInText = 'Login';
  let loggedInTo = './login';
  if (loggedInStatus) {
    loggedInText = 'Profile';
    loggedInTo = './';
  }

  return (
    <Navbar sticky="top" className="navbar-main" collapseOnSelect expand="lg" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand><Link to="./"><img id="inl" className="inl-logo" src="./assets/INLlogo_long.png" alt="" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-tab" to="./admin">Admin</Link>
            <Link className="nav-tab" to="./about">About</Link>
            <Link className="nav-tab" to={loggedInTo}>{loggedInText}</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
