import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from 'react-router-dom';

const NavBar = () => (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand>
                <Link to="/">INL Resilience Indicator</Link>
            </Navbar.Brand>
            <Nav className="me-auto">
                <Link className="NavComp" to="/">Home</Link>
                <Link className="NavComp" to="/about">About</Link>
            </Nav>
            <Nav className="me-4">
                <Link className="NavComp" to="/login">Login</Link>
            </Nav>
        </Container>
    </Navbar>
);

export default NavBar;