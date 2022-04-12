import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import '../styles/navbar.css';

const NavBar = function NavBarFunc() {
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  const [user, setUser] = useState({
    isAdmin: false,
    email: '',
  });

  useEffect(() => {
    Axios
      .get('/api/logged-in', { withCredentials: true })
      .then((res) => {
        setLoggedInStatus(res.data.loggedIn);
        if (res.data.user) {
          setUser(res.data.user);
        }
      });
  }, []);

  return (
    <Navbar sticky="top" className="navbar-main" collapseOnSelect expand="lg" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand><Link to="./home"><img id="inl" className="inl-logo" src="/assets/INLlogo_long.png" alt="" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-tab" to="./achievements">Achievements</Link>
            {user.isAdmin ? <Link className="nav-tab" to="./admin">Admin</Link> : null}
            <Link className="nav-tab" to="./about">About</Link>
            <Link className="nav-tab" to={loggedInStatus ? './profile' : './login'}>{loggedInStatus ? user.email : 'Login'}</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
