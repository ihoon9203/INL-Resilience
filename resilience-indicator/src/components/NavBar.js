import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './Component.css';

const NavBar = function NavBarFunc() {
  return (
    <Navbar sticky="top" className="navbar-main" collapseOnSelect expand="lg" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand><Link to="./"><img id="inl" className="inl-logo" src="./assets/INLlogo_long.png" alt="" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-tab" to="./about">About</Link>
            <Link className="nav-tab" to="./login">Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
